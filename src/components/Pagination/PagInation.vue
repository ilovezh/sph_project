<template>
     <div class="pagination">
  
  <!-- 上部分 -->
    <button :disabled="pageNo == 1"  @click = "divPage" >上一页</button>
      <button v-if="startNumAndEndNum.start > 1" @click = "sendPageNo(1)" :class = "{active:pageNo == 1}">1</button>
    <button v-if="startNumAndEndNum.start>2">•••</button>

    <!-- 中间部分 -->
    <button v-for="(page,index) in startNumAndEndNum.end" :key = "index" 
         v-if="page >= startNumAndEndNum.start"
        @click = "sendPageNo(page)" :class = "{active:pageNo == page}">{{page}}</button>

    <!-- 下部分 -->
    <button v-if="startNumAndEndNum.end < totalPage-1">•••</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click = "sendPageNo(totalPage)" :class = "{active:pageNo == totalPage}">{{totalPage}}</button>
    <button  :disabled = "pageNo == totalPage" @click = "addPage" >下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>

</template>

<script>
export default {
name:"PagInation",
props:["pageNo","pageSize","total","continues"],
// pageNo表示当前页数,pageSize表示当前页有几项内容,total表示总共有几项内容,continues表示连续出现的页码个数
data(){
    return{
  
    }
},
computed:{
    totalPage(){
       // 计算总页数,向上取整
        return Math.ceil(this.total/this.pageSize)
    },
    // 计算连续的页码的起始数字与结束数字
    startNumAndEndNum(){
    const {pageNo,continues,totalPage} = this;
    //  先定义两个变量存储起始数字与结束数字
    let start = 0,end = 0;
    // 连续页码5(就是至少5页),如果出现不正常现象(数据小于5页)
    if(continues >= this.totalPage){
        start = 1;
        end = totalPage;
    }else{
        // 如果连续页为5,那么start = 5/2 =2
        // 如果连续页为7,那么start  = 7/2 =3
        // 如果连续页为9,那么start = 9/2 =4
       // 如果连续页为 11,那么start = 11/2 =5

       
            start = pageNo -   Math.floor(continues/2) 
             end = pageNo   +   Math.floor(continues/2) 
           if(start < 1){
               start = 1;
               end = continues
           }

           if(end > totalPage){
               end = totalPage;
               start = totalPage - continues + 1
           }

    }


    return {start,end};
    }
},
methods:{
    sendPageNo(page){
        this.currPage = page;
        this.$emit("getPageNo",page)
        this.$emit("pageNo",page)
    },
    divPage(){
        this.$emit("divPage");
    },
    addPage(){
        this.$emit("addPage")
    }
}
}
</script>

<style lang = "less" scoped>
.active{
    background-color: skyblue;
}
.pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }





</style>