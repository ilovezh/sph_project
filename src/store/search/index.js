//  search 模块的小仓库
import {reqGetProductList} from "@/api/index"
const state = {
   productList:{},
};
const mutations = {
    GETPRODUCTLIST(state,productList){
       state.productList = productList;
    }
};
const actions = {
    async getProductList({commit},params={}){
        // params参数是用户在dispatch(派发行为时,传递进去的第二个参数),params形参,是当用户派发action的时候,第二个参数传递过来的,至少是一个空对象
        //  params={} 表示默认参数,当params形参不传时(为undefined)时,params默认为 {}
        let result = await reqGetProductList(params);
        console.log(result);
    if(result.code == 200){
         commit("GETPRODUCTLIST",result.data)
    }
    }
};
// 计算属性,在项目中是为了简化数据而生
// 项目当中,getters的作用主要是为了简化仓库中的数据
// 可以把我们将来在组件当中需要用到数据简化一下(将来组件在获取数据的时候方便一些)
const getters = {
    // state表示当前Search模块的仓库中的state数据，并非大仓库中的state 
    goodsList(state){
        // 表示如果服务器的数据回来了,那么state.productList(不是一个空对象),那么 state.productList.goodsList是一个数组
        // 表示如果服务器的数据没有回来,那么state.productList(是一个空对象),那么 state.productList.goodsList是undefined,
        // || 表示返回转为布尔值不为false的数据或最后一个转为布尔值为false的数据,如果state.productList.goodsList是undefined,那么返回[]
        return state.productList.goodsList || [];
    },
    trademarkList(state){
        return  state.productList.trademarkList || [];
    },
    attrsList(state){
        return  state.productList.attrsList || [];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}