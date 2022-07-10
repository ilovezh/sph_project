<template>
  <div class="swiper-container" id="floor1Swiper" ref="mySwiper2">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img,index) in list" :key="img.id">
        <img :src="img.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carsouel",
  props: ["list"],
  // watch用于监听数据的变化,当数据发生变化时,执行相应的代码
  watch: {
    // watch监听,监听已有数据的变化
    // bannerList,由一个空数组变化为一个含有四个元素的数组
    list: {
      // 当前代码只能保证bannerList的数据已经有了,没有办法保证v-for 遍历数据产生dom结构的操作执行完毕
      // nextTick在下次DOM更新 循环结束之后执行延迟回调（即在服务器的数据bannerList数据回来以后,依据这个数据,v-for页面生成dom结构以后再调用）
      handler(newValue, oldValue) {
        console.log("数据已经回来了");

        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.mySwiper2, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar"
            }
          });
        });
      },
      // 不管数据变化还是不变化,组件一经挂载就执行一次watch内对应的代码
      // 为什么watch监听不到floor的变化?因为这个数据从来没有发生变化,(数据是父亲给的,父亲给的时候就是一个对象,对象里面该有的数据都是有的)
      immediate: true
    }
  }
};
</script>

<style>
</style>