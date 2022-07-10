<template>
  <div class="spec-preview">
    <!-- 放大图片的原图片 -->
    <img src="../images/s1.png" />
    <!-- 供鼠标移动的容器 -->
    <div class="event" @mousemove="handler($event)"></div>
    <div class="big">
      <!-- 容纳放大图片的容器 -->
      <img src="../images/s1.png"  ref = "big" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref = "mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:["skuImageList"],
    data(){
      return {
        currIndex:0
      }
    },
    mounted(){
this.$bus.$on("getCurrIndex",(index)=>{
  this.currIndex = index
})
    },
    computed:{
      imgObj(){
        return this.skuImageList[this.currIndex] || {}
    }
  },
  methods:{
    handler(e){
    let mask = this.$refs.mask;
    // left(遮罩层左侧到供鼠标移动的容器左侧的距离) 为 鼠标位置到供鼠标移动的容器左侧的距离减去 遮罩层自身宽度的1/2
    let left = e.offsetX - mask.offsetWidth/2;
    // top(遮罩层上侧到供鼠标移动的容器上侧的距离) 为 鼠标位置到供鼠标移动的容器上侧的距离减去 遮罩层自身高度的1/2
    let top = e.offsetY - mask.offsetHeight/2;
    if(left < 0){
      left = 0;
    }
    if(left >= mask.offsetWidth) left = mask.offsetWidth;
    if(top < 0){
      top = 0;
    }
    if(top >= mask.offsetHeight) top = mask.offsetHeight;
    // 修改mask遮罩层元素的left与top值
    mask.style.left = left +"px";
    mask.style.top = top + "px"
    let big = this.$refs.big;
    big.style.left = -2* left +"px";
    big.style.top = -2 * top + "px"

    }
  }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>