import {reqAddress} from "@/api"

const state = {
    address:[]
};
const actions = {
    // 获取用户地址信息
    async getUserAddress({commit}){
       let result =  await reqAddress();
       if(result.code === 200){
          commit("GETUSERADDRESS",result.data);
          return "ok"
       }else{
           return Promise.reject(new Error("出错"));
       }
    }
};
const mutations = {
    GETUSERADDRESS(state,address){
        state.address = address
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}