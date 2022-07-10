// 购物车列表
import {reqCartList} from "@/api/index"
const state = {
    shopCarts : [] 
};
const mutations = {
    GETSHOPCARTS(state,shopCart){
     state.shopCarts = shopCart
    }
};
const actions = {
    // 获取购物车列表的数据
    async getShopCarts({commit}){
      let result =    await reqCartList();
      if(result.code == 200){
          console.log(result)
          commit("GETSHOPCARTS",result.data)
      }

    },
    
deleteCheckedAll(context){
  console.log(context);

//   {getters: {…}, state: {…}, rootGetters: {…}, dispatch: ƒ, commit: ƒ, …}
// commit: ƒ boundCommit(type, payload, options)
// dispatch: ƒ boundDispatch(type, payload)
// getters: {…}
// rootGetters: {…}
// rootState: {__ob__: Observer}
// state: {__ob__: Observer}
// [[Prototype]]: Object


    }

    
};
const getters = {
    cartlist(state){
        return state.shopCarts[0] || {};
    }
    // 计算出来的购物车属性

};
export default {
    state,
    mutations,
    actions,
    getters
}