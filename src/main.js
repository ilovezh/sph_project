import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 三级联动组件注册为一个全局组件
import TypeNav from "./components/TapNav/TapNav.vue"
import Carsouel from "@/components/Carsouel/MyCarsouel.vue"
import Pagination from "@/components/Pagination/PagInation.vue"
// 第一个参数为全局组件的名字,第二个参数为哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carsouel.name,Carsouel)
Vue.component(Pagination.name,Pagination)
// 引入 mock_server.js --mock数据
import "@/mock/mock_server"
// 引入仓库
import store from "./store"
// 引入 swiper样式
import "swiper/css/swiper.css"
import { Button, MessageBox } from 'element-ui';

// 注册全局组件
// Vue.component(Button.name, Button);
// Element-UI注册组件的时候,还有一种写法,挂在原型上
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$msgbox = MessageBox;
// import * as API from '@/文件路径'
// 这种写法是把所有的输出包裹到 API 对象里
import * as API from "@/api"
Vue.prototype.$API = API;

// 引用插件
import VueLazyload from 'vue-lazyload'
// 引入图片
import atm from "@/assets/1.gif"
// 即atm 表示 动图 "@/assets/1.gif"
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading:atm,
 })

//  引入自定义插件
import MyPlugin from "@/plugins/myPlugin";
Vue.use(MyPlugin,{
  name:"upper"
});

// 引入校验插件
// import 语句的作用是加载并执行对应的文件
import "@/plugins/validate"

new Vue({
  // 注册路由,底下的写法KV一致，省略V(对象的简写形式)
  // 等效为 router:router
  router,
  // 注册store：组件实例的身上会多一个属性$store
  store,
   render: h => h(App),

  //  配置全局事件总线
   beforeCreate(){
    Vue.prototype.$bus = this;
   }
  
 
}).$mount('#app')
