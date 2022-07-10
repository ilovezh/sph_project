//  detail 模块的小仓库
import { reqGoodsInfo } from "@/api/index";
import { reqAddOrUpdateShopCart } from "@/api/index";
import {getUUID} from "@/utils/uuid_token"
const state = {
   goodsInfo:{},
  //  游客临时身份
  uuid_token:getUUID(),
   
};
const mutations = {
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo
    },
   
};
const actions = {
//    获取产品信息的action
async getGoodsInfo({commit},skuid){
 const result = await reqGoodsInfo(skuid);
 if(result.code == 200){
 commit("GETGOODSINFO",result.data)
 }
},
async getAddOrUpdateShopCart({commit},{skuId,skuNum}){
  // 加入服务车返回的解构
  //加入购物车后发请求,前台将参数带给服务器
  //服务器写入数据成功,并没有返回其他的数据,只是返回code=200,代表这次操作成功
  //因为服务器没有返回其余数据,因此不需要三连环存储数据
 let result = await reqAddOrUpdateShopCart(skuId,skuNum)
 console.log(result);

 if(result.code == 200){
  //  代表服务器加入购物车成功
   return "ok"
 }else{
   return Promise.reject(new Error("fail"));
 }

 //async修饰的函数,当前这个函数如果执行,返回Promise,返回非空字符串表示返回的Promise是成功状态,返回Promise.reject(new Error("fail"))
 //表示返回的Promise是失败状态
}
};
  const getters = {
      //简化数据而生
    //   路径导航简化数据
      categoryView(state){
        //   比如state.goodInfo初始状态空对象,空对象的categoryView属性值为undefined
         // 当前计算出的categoryView属性值至少是一个空对象,假的报错就不会有了
     return state.goodsInfo.categoryView || {};
      },
    //   产品信息简化数据
      skuInfo(state){
          return state.goodsInfo.skuInfo || {};
      },
    //  产品售卖属性简化数据
    spuSaleAttrList(){
        return state.goodsInfo.spuSaleAttrList || [];
    }

  };
export default {
    state,
    mutations,
    actions,
    getters
}