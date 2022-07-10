<template>
  <div class="swiper-container" ref = "mySwiper2">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for = "(n,index) in 4" :key = "index"  >
        <img src="../images/s1.png" @click  ="changeIndex(index)" :class = "{active:currIndex == index}">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props:["skuImageList"],
    data(){
      return{
        currIndex:0
      }
    },
    methods:{
     changeIndex(index){
      this.currIndex = index
      // 通知兄弟组件当前索引
      this.$bus.$emit("getCurrIndex",index)
     }
    },
    watch:{
     // 监听数据,可以保证数据一定ok,但是不能保证v-for遍历结构是否完事,
      skuImageList:{
        handler(newValue,oldValue){
            this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.mySwiper2, {
            // direction: 'vertical', // 垂直切换选项
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            },
            // 显示几个图片设置,设置轮播图一屏显示多少张图片
            slidesPerView:3,
            // 表示轮播图切换图片时,一次切换三张图片(每次切换图片的个数)
            slidesPerGroup:3


          });
        });
        },
        immediate:true
      }
    }
  }
</script>

<style lang="less" scoped>
 
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

      }
    }

   

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>