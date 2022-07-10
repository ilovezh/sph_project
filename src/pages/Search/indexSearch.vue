<template>
  <div>
    <!-- 商品分类三级联动 -->
    <TapNav />

    <div class="main">
      <div class="py-container">
        <!-- 面包屑,带有x的结构 -->
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName" @click="removeCategoryName">{{searchParams.categoryName}}x</li>
            <!-- 关键字的面包屑 -->
             <li class="with-x" v-if="searchParams.keyword" @click="removeKeyword">{{searchParams.keyword}}x</li>
             <!-- 品牌的面包屑 -->
                 <li class="with-x" v-if="searchParams.trademark" @click ="removeTrademark">{{searchParams.trademark.split(":")[1]}}x</li>
           <!-- 平台售卖属性面包屑 -->
                  <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index" @click="removeAttr(index)">{{attrValue.split(":")[1]}}x</li>
               
          </ul>
        </div>

        <!--selector-->
        <!-- 功能筛选 -->
        <SearchSelector @trademarkInfo = "trademarkInfo" @attrInfo = "attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a href="#">综合  <span v-if="isOne" class="iconfont" :class ="{'icon-down':isDesc,'icon-up':isAsc}"></span> </a>
                </li>
                <li :class="{active:isTwo}"  @click="changeOrder('2')">
                  <a href="#">价格 <span v-if="isTwo" class="iconfont" :class ="{'icon-down':isDesc,'icon-up':isAsc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售的产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for = "(good,index) in goodsList" :key = "good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- :to=""  表示""内为js表达式 即 `/detail/${good.id}` 为js表达式模板字符串的结果 -->
                    <router-link :to = "`/detail/${good.id}`">
                      <img v-lazy = "good.defaultImg"/>
                      </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
           <PagInation :pageNo = "searchParams.pageNo" :pageSize = "searchParams.pageSize" :total = "total" :continues="5"
           @getPageNo = "getPageNo" @divPage = "divPage" @addPage = "addPage" @pageNo = "pageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapGetters,mapState} from "vuex"
  export default {
    name: 'indexSearch',
    beforeMount(){
      // 在组件挂载之前,在数据代理创建之后调用
      // Object.assign:es6新增的语法,用于合并对象
      // 表示将 this.$route.query对象,this.$route.params对象中的同名属性合并到this.searchParams对象中
      Object.assign(this.searchParams,this.$route.query,this.$route.params)

    },
    mounted(){
      // 组件挂载完毕执行一次(仅执行一次)
      // 在发送请求之前带给服务器,[searchParams参数发生变化,有数值带给服务器]
      this.getData();
      
   
    },
    components: {
      SearchSelector
    },
    computed:{
      // mapGetters里面的写法,传递的数据,因为getters计算属性是没有划分模块的,所以传递的数据是数组(数组里面书写要获取的数据)
     ...mapGetters(["goodsList"]),
     ...mapState({
      total:state=> state.search.productList.total
     }),
    //  Getters
    //  attrsList:Array[1]
    // goodsList:Array[1]
    // trademarkList:Array[1]
  isOne(){
    return this.searchParams.order.indexOf('1') !== -1
  },
  isTwo(){
    return this.searchParams.order.indexOf('2') !== -1
  },
  isAsc(){
    return this.searchParams.order.indexOf('asc') !== -1
  },
  isDesc(){
     return this.searchParams.order.indexOf('desc') !== -1
  }
    },
    data(){
      return{
        // 带给服务器的参数
  searchParams:{
    // 一级分类的id
  "category1Id": "",
   // 二级分类的id
  "category2Id": "",  
  // 二级分类的id   
  "category3Id": "",
  // 分类的名字
  "categoryName": "",
  // 关键字
  "keyword": "",
  // 排序
  "order":"1:desc",
  // 分页器有关,代表当前第几页
  "pageNo": 9,
  // 代表每一页展示数据的个数
  "pageSize": 3,
  // 平台售卖的属性
  "props": [],
  // 品牌
  "trademark": ""
}
      }
    },
    methods:{
    // 向服务器发送请求,获取search模块数据(根据参数返回不同的数据进行展示)
    // 把这次请求封装为一个函数,在需要发送请求的时候再调用
    getData(){
   this.$store.dispatch("getProductList",this.searchParams)
    },
    pageNo(page){
      this.searchParams.pageNo = page;
    },
    removeCategoryName(){
      // 把带给服务器的参数置空了,还需要向服务器发送请求
      // 置空三级分类残留的id信息，即置空路由的参数(query)信息,(params)参数信息取决于搜索框的实时value值,不输入时value值就为空,不需要置空
      this.searchParams.categoryName = undefined;
       this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 当将参数值赋值为undefined时,参数就不会发送至服务器,就不会占用太多宽带,提高性能
      // 获取搜索页展示的默认数据
      this.getData()
      // 地址栏也需要改,进行路由跳转
      if(this.$route.params){
        // this.$route.params为一个对象,恒为真
      this.$router.push({name:"search",params:this.$route.params})
      }
    },
    removeKeyword(){
      // 服务器带的参数searchParams的keyword置空
      this.searchParams.keyword = undefined;
       this.getData()
      // 通知兄弟组件Header清除关键字
      this.$bus.$emit("clearKeyword");
      if(this.$route.query)
      this.$router.push({name:"search",query:this.$route.query})

    },
    trademarkInfo(t){
      // 自定义事件回调
      // 整理品牌字段的参数
      this.searchParams.trademark = `${t.tmId}:${t.tmName}`
      this.getData();

    },
    removeTrademark(){
      this.searchParams.trademark = undefined;
      this.getData();
    },
    attrInfo(attr,aValue){
      // 手机品牌售卖属性的回调
      // 参数格式整理好
      let props = `${attr.attrId}:${aValue}:${attr.attrName}`
      // 数组去重
      // if语句里面只有一行代码,可以省略大花括号
      if(this.searchParams.props.indexOf(props) == -1 )  this.searchParams.props.push(props);
      
      console.log(attr,aValue)
      this.getData();
    },
    removeAttr(index){
     // 再次整理参数
    this.searchParams.props.splice(index,1)
    // 再次发送请求
    this.getData();
    },
    changeOrder(flag){
      // flag为一个标记,代表用户点击的时候点击的是综合(1)还是价格(2)，用户点击的时候传递进来的
      // 获取原始的order
      let orignOrder = this.searchParams.order;
      let originFlag = this.searchParams.order.split(":")[0]
      let originSort = this.searchParams.order.split(":")[1]
       // 准备一个新的order值
      let newOrder = ""
      // 点击的是综合
      if(flag == originFlag){
        newOrder = `${originFlag}:${originSort=="desc" ? "asc" : "desc"}`
       }else{
    //  点击的是价格
         newOrder = `${flag}:desc`
       }
      //  将新的newOrder赋予 this.searchParams.order
      this.searchParams.order = newOrder;
      // 因为 searchParams 发生了变化,所以要重新发送请求
      // 再次发送请求
      this.getData();
 },
    getPageNo(page){
   // 整理带给服务器的参数,再次发请求
    },
    divPage(){
      this.searchParams.pageNo --;
    },
    addPage(){
   this.searchParams.pageNo ++;
    }
    },
    watch:{
      // 数据监听,监听组件实例身上的属性的属性值变化
      // 监听属性
      $route(newValue,oldValue){
      // 这里实质监听的是$route的path属性,即地址栏的路由地址发生改变后,重新提交给服务器最新的路由信息(路由参数)
      // 再次发送请求之前整理带给服务器的参数
       Object.assign(this.searchParams,this.$route.query,this.$route.params)
      // 再次发送ajax请求
      this.getData();
      // 每一次请求完毕,应该把相应的1,2,3级分类的id置空,让他接受下一次相应的1,2,3级分类id
      // 因为如果只是一级分类id(只有一级分类id需要作为请求参数发送)发生了变化,那么上一次请求的二三级分类id仍然会被当做请求参数发送出去,所以这是不对的
      //     如果只是三级分类id(只有三级分类id需要作为请求参数发送)发生了变化,那么上一次请求的一二级分类id仍然会被当做请求参数发送出去,所以这是不对的
      //     如果只是二级分类id(只有二级分类id需要作为请求参数发送)发生了变化,那么上一次请求的一三级分类id仍然会被当做请求参数发送出去,所以这是不对的
      // 每一次发送请求后,应该把本次请求的一二三级分类Id清空,从而可以使下一次发送请求时携带的是最新的一二三级分类id
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      console.log(this.searchParams)

      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>