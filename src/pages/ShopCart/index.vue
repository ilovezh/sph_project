<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for = "(num,index) in 5" :key = "index">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list"  :checked = "checked" @change="changeTotal" >
          </li>
          <li class="cart-list-con2">
            <img src="./images/goods1.png">
            <div class="item-msg">米家（MIJIA） 小米小白智能摄像机增强版 1080p高清360度全景拍摄AI增强</div>
          </li>
        
          <li class="cart-list-con4">
            <span class="price">{{cartPrice[index]}}</span>
          </li>
        
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('mins',-1,index)">-</a>
            <input autocomplete="off" type="text" :value="cartNum[index]" minnum="1" class="itxt" @click="handler('changed',$event.target.value*1,index)">
            <a href="javascript:void(0)" class="plus" @click="handler('plus',1,index)">+</a>
          </li>
        
        
        
          <li class="cart-list-con6">
            <span class="sum">{{cartPrice[index] * cartNum[index]}}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked = "isAllChecked"  @change = "changedChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none"  @click = "deleteChecked()">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{sumPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click = "$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
  export default {
    name: 'ShopCart',
    mounted(){
   this.getData()
    },
    data(){
      return{
        cartPrice:[100,200,300,400,500],
        cartNum:[1,2,3,4,5],
        total:0,
        checked:false
      }
    },
    methods:{
      getData(){
        // 获取个人购物车的数据
           this.$store.dispatch("getShopCarts");
      },
      changeTotal(e){
        this.$nextTick(()=>{
    
      if(e.target.checked == true){
          this.total += 1;
        }else{
          this.total -= 1;
        }
        })
        
      },
      changedChecked(e){
         this.$nextTick(()=>{
       if(e.target.checked == true){
         this.checked = true
         this.total = 5
       }else{
        this.checked = false
         this.total = 0;
       }
         })
      },
      // 修改产品数量

    async handler(type,disNum,index){
        // type是为了区分这三个元素
        // disNum形参: + 变化量(1), - 变化量-1 ,input最终的个数(并不是变化量)
        // index 表示产品对应的索引值
       // 向服务器发请求,修改数量
        switch(type){
         case "mins":
           // 带给服务器变化量
           //判断产品的个数大于1,才可以传递给服务器-1
           //如果出现产品的个数小于等于1,传递给服务器个数0(原封不动)
            disNum = this.cartNum[index] > 1 ? -1 : 0
            break;
           case "plus":
            disNum = 1;
             break;
             case "changed":
               // 用户输入进来的是终量,非法的(带有汉字),带给服务器的数据
               if(isNaN(disNum) || disNum < 1){
                 disNum = 0;
               }else{
                 disNum = parseInt(disNum) - this.cartNum[index];
               }
        }

        try {
          //代表的是修改成功
          await this.store.dispatch("getAddOrUpdateShopCart",{skuId:index,skuNum:disNum})
          // 再一次获取服务器最新的数据进行展示
          this.getData()
        } catch (error) {
          alert (error.message)
        }
      },
      deleteChecked(){
       this.$store.dispatch("deleteCheckedAll");
      }

    },
    computed:{
      ...mapGetters(["cartlist"]),
      // 购物车数据
      cartInfoList(){
      return this.cartlist.cartInfoList || [];
      },
      sumPrice(){
        let total = 0
       for(let i = 0; i < this.cartPrice.length; i++){
         total += this.cartPrice[i] * this.cartNum[i];
       }
       return total;
      },
      isAllChecked(){
        if(this.total == this.cartPrice.length){
          return true;
        }else{
          return false;
        }
      },
      },
     
  
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 15%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 17%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>