<template>
   <div class="type-nav">
            <div class="container">
         <div @mouseleave="leaveIndex" @mouseenter="enterShow" >
                <h2 class="all" >全部商品分类</h2>
                <!-- 三级联动 -->
         <transition name = "sort">
                  <div class="sort" v-show = "show">
                    <div class="all-sort-list2"  @click = "goSearch" >
                        <div class="item" v-for = "(c1,index) in categoryList" :key = "c1.categoryId" >
                            <h3 @mouseenter="changeIndex(index)"  :class = "{curr:currentIndex == index}">
                                <a  :data-categoryName = "c1.categoryName" :data-category1Id = "c1.categoryId">{{c1.categoryName}}</a>
                            </h3>
                            <!-- 二三级分类 -->
                            <div class="item-list clearfix" :style = "{display:currentIndex==index ? 'block':'none'}">
                                <div class="subitem" v-for = "(c2) in c1.categoryChild" :key = "c2.categoryId" >
                                    <dl class="fore">
                                        <dt>
                                            <a  :data-categoryName = "c2.categoryName" :data-category2Id = "c2.categoryId" >{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for = "(c3) in c2.categoryChild" :key = "c3.categoryId">
                                                <a  :data-categoryName = "c3.categoryName" :data-category3Id = "c3.categoryId">{{c3.categoryName}}</a>
                                            </em>
                                          
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                     
                    </div>
                </div>
         </transition>
                </div>
               
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
              
            </div>
        </div>
</template>

<script>
// 引入vuex中的mapState,进行仓库中状态数据的映射
import {mapState} from "vuex";
// 引入lodash用于函数节流,最好的引入方式为按需加载
import throttle from "lodash/throttle";
export default {
name:"TapNav",
mounted(){
    // 当组件挂载完毕,可以向服务器发请求
    // 通知vuex,获取数据,存储于仓库当中
    // this.$store.dispatch("categoryList");
    // 如果不是Home路由组件,将TapNav进行隐藏
    if(this.$route.path != "/home"){
        this.show = false;
    }
},
data(){
    return{
        // 存储用户鼠标移上哪一个一级分类
        currentIndex:-1,
        show:true,
        
     }
},
methods:{
changeIndex:throttle(function(index){
  // 鼠标移入,修改响应式数据currentIndex
    //    index:鼠标移上某一个一级分类的元素的索引值
    this.currentIndex = index
},50),
leaveIndex(){
    // 一级分类,鼠标移出的事件
    this.currentIndex = -1;
    if(this.$route.path != "/home"){
      this.show = false;
    }
  
},
goSearch(event){
    // 将子节点当中a标签,加上自定义属性 data-categoryName,其余的子节点是没有的
    // 自定义属性在浏览器的标签中都是小写的(即使自己命名时包含大写)
    // 获取到触发当前这个事件的节点][h3,a,dt,dl],需要带有data-categoryname的节点一定是[a标签]
    // 节点有一个dataset属性,可以获取节点的自定义属性与属性值
    //  event.target 拿到父节点下触发事件的源对象(触发事件的子节点)
    console.log(event.target.dataset);
    // DOMStringMap{vC9083ce2: '', categoryname: '图书、音像、电子书刊'}
    let {categoryname,category1id,category2id,category3id} = event.target.dataset;
    // 如果触发事件的子节点拥有categoryname自定义属性,那么就一定是a标签
    if(categoryname){
        // 区分一级分类、二级分类、三级分类的a标签
        // 整理路由跳转的参数
        let location = {name:"search"};
        let query = {categoryName:categoryname}
      if(category1id){
            query.category1Id = category1id
      }else if(category2id){
            query.category2Id = category2id
      }else{
            query.category3Id = category3id
      }
    //   整理完参数
    location.query = query;
    if(this.$route.params){
        location.params = this.$route.params;
    }
       this.$router.push(location)
    }
   
},
enterShow(){
    if(this.$route.path != "/home"){
      this.show = true;
    }
},


},
computed:{
    ...mapState({
        // 右侧需要一个函数,当使用这个计算属性的时候,右侧函数会立即执行一次
        //注入一个参数state,其实为大仓局中的数据
        categoryList:(state)=>{
         return state.home.categoryList
            //          home:Object
           // categoryList:Array[1]
           // search:Object (empty)
        }
    })
}

}
</script>

<style lang = "less" scoped>
 .type-nav {

        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                       
                    }
                    .curr{
                        background-color:orange;
                    }
                }
            }
            /* 过渡动画的样式 */
            /* 过渡动画开始状态(进入) */
            .sort-enter{
                height:0px;
                /* transform: rotate(0deg); */
            }
            /* 过渡动画结束状态(进入) */
            .sort-enter-to{
              height:461px;
              /* transform: rotate(360deg); */
            }
            /* 定义动画事件、速率 */
            .sort-enter-active{
                transition: all .5s linear;
            }
        }
    }
</style>