//  home 模块的小仓库
import {reqCategoryList} from "../../api/index"
import {reqGetBannerList} from "@/api/index";
import {reqGetFloorList} from "@/api/index";
const state = {
    // state中数据的默认初始值是根据接口的返回值进行初始化的
    categoryList:[],
    bannerList:[],
    floorList:[],
};
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
};
const actions = {
    // 通过API里面的接口函数调用,向服务器发请求,获取服务器数据
  async  categoryList({commit}){
      let result = await  reqCategoryList();
     if(result.code == 200){
      commit("CATEGORYLIST",result.data);
     }
    },
    // 获取首页轮播图数据
    async getBannerList ({commit}){
        let result  = await reqGetBannerList();
        if(result.code == 200){
            console.log(result.data);
            commit("GETBANNERLIST",result.data);
           }
    },

     // 获取floor轮播图数据
     async getFloorList ({commit}){
        let result  = await reqGetFloorList();
        if(result.code == 200){
            console.log(result.data);
            commit("GETFLOORLIST",result.data);
           }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}