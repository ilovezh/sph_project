//配置路由
import Vue from "vue";
import VueRouter from "vue-router"
import routes from "./routes"
import store from "@/store"
// 使用插件
Vue.use(VueRouter);
// 先将vueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push;
// 先将vueRouter原型对象的replace保存一份
let originReplace = VueRouter.prototype.replace;
// 重写push 与 replace方法
VueRouter.prototype.push = function(location,resolve,reject){
if(resolve && reject){
    // call || apply 区别:相同点,都可以调用函数一次,都可以篡改函数的上下文一次
    //不同点:call和apply传递参数,call传递参数用逗号分割,apply方法执行传递数组
    originPush.call(this,location)
}else{
    originPush.call(this,location,()=>{},()=>{});
}
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        // call || apply 区别:相同点,都可以调用函数一次,都可以篡改函数的上下文一次
        //不同点:call和apply传递参数,call传递参数用逗号分割,apply方法执行传递数组
        originReplace.call(this,location)
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
    }
 let router = new VueRouter({
// 配置路由
   routes,
   scrollBehavior(to,from,savedPosition){
    //    返回的y = 0表示着跳转到路由组件时滚动条在最上方,即滚动条距离页面顶部的距离为 0 px
       return {x:0,y:0}
   }
})

// 全局守卫 ,前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to,from,next)=>{
// to:可以获取到想要跳转到的路由信息
// from :可以获取到从哪个路由跳转而来的路由信息
// next放行函数, next()放行
//              next("/login"), 放行到指定的路由
//              next(false),中断路由导航

// 用户登录了才会有token,未登录一定不会有token
let token = store.state.user.token;
// 用户信息
let name = store.state.user.userInfo.name
// 用户已经登录了
if(token){
    // 用户已经登录了还想去login,休想，使他停留在首页
if(to.path == "/login"){
    next("/home")
}else{
    // 用户已经登录了,去的不是login
    if(name){
        // 如果用户信息已经有
        next();
    }else{
// 没有用户信息,派发action ,让仓库存储用户信息,再跳转
try {
    // 获取用户信息成功
    await store.dispatch("userInfo")
    next();
} catch (error) {
    // token过期(失效了)
    // 清除token
   await  store.dispatch("loginOut")
//  等待退出登录的操作完成
//  再跳转到 login页面
    next("/login");
}
}
   
    // 转化为布尔值为false的有 "" false  undefined  null NaN 0,其他转为true
}
}else{
let toPath = to.path;
    if(toPath.indexOf("/trade") !== -1 || toPath.indexOf("/pay") !== -1 || toPath.indexOf("center") !== -1){
    //    把未登录的时候想去而没去成的信息,存储在地址栏中
        next("/login?redirect=" +toPath)
    }else{
        next();
    }
// 未登录时的用户处理,不能去交易相关的,不能去支付相关的,不能去个人中心
// 未登录去上面这些路由,去往登录页面
// 去的不是上面这些路由(home|search|shopCart),放行

}
})

export default router;