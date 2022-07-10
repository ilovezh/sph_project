<template>
  <div id="app">
<Header/>   
<!-- 书写路由组件出口文件 -->
<router-view ></router-view>
<!-- 在Home、Search是显示的,在登录、注册是隐藏的 -->
<Footer v-show = "$route.meta.show"/>    
  </div>
</template>

<script>
import Header from "./components/Header/indexHeader.vue"
import Footer from "./components/Footer/indexFooter.vue"
export default {
  name: 'App',
  components: {
  Header,
  Footer
  },
  mounted(){
  this.$store.dispatch("categoryList");
  // 派发action,获取floor组件的数据
    this.$store.dispatch("getFloorList");
   
  }
}
</script>

<style>

</style>
