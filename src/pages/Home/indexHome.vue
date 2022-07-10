<template>
  <div>
    <!-- 三级联动全局组件,三级联动已经注册为一个全局组件,所以使用全局组件时不需要再import引入了 -->
    <TapNav/>
    <ListContainer/>
    <ReCommend />
     <ProRank />
     <YouLike/>
     <MyFloor v-for="(floor,index) in floorList" :key="floor.id" :floor = "floor"/>
  
     <MyBrank/>
    
  </div>
</template>

<script>

// 引入其余的组件
import ListContainer from "./ListContainer/ListContainer.vue"
import ReCommend from "./Recommend/ReCommend.vue"
import ProRank from "./ProRank/ProRank.vue"
import YouLike from "./YouLike/YouLike.vue"
import MyFloor from "./Floor/MyFloor.vue"
import MyBrank from "./Brank/MyBrank.vue"


import {mapState} from "vuex"
export default {
name:"indexHome",
components:{
  ListContainer,
  ReCommend,
  ProRank,
  YouLike,
  MyFloor,
  MyBrank
},
computed:{
    ...mapState({
        floorList:(state)=>{
            return state.home.floorList
        }
    })
}

}
</script>

<style>

</style>