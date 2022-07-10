// 登录与注册仓库
import {reqGetPhone} from "@/api"
import {reqUserRegister} from "@/api"
import {reqUserLogin} from "@/api"
import {reqUserInfo} from "@/api"
import {setToken,getToken,removeToken} from "@/utils/token"
import {reqLoginOut} from "@/api"

// reqGetPhone
const state = {
    code:"",
    token:getToken(),
    userInfo:{}
};
const mutations = {
    GETCODE(state,code){
    state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token;
    },
    USERINFO(state,userinfo){
        state.userInfo = userinfo
    },
    LOGINOUT(state){
        // 清除本地数据
     state.token = "";
     state.userInfo = {};
     removeToken();
    }
};
const actions = {
    //获取验证码
 async getCode({commit},phone){
     // async 用于将异步代码转为同步代码来执行,result拿到的是请求成功返回的结果
  let result =  await reqGetPhone(phone);
  if(result.code == 200){
      commit("GETCODE",result.data);
      return "ok";
  }else{
      return Promise.reject(new Error("faile"));
  }
},
// 注册
async userRegister({commit},data){
   let result =  await reqUserRegister(data)
   if(result.code == 200){
       console.log(result);
       return "ok";
   }else{
       return Promise.reject(new Error("出错"));
   }
},

// 登录(token)
async userLogin ({commit},data){
    // 服务器下发token,用户唯一标识符
  let result =   await reqUserLogin(data);
  if(result.code == 200){
      commit("USERLOGIN",result.data.token)
      //持久化存储token
    setToken(result.data.token)
      return "ok"
  }else{
      return Promise.reject(new Error("登录失败"));
  }
    
}
,
// 携带token向服务器要用户信息
async userInfo({commit,state}){
 let result =  await reqUserInfo()
 // 携带着token向服务器获取用户信息
 if(result.code == 200 && state.token){
     commit("USERINFO",result.data);
     return "ok"
 }else{
     return Promise.reject(new Error("失败"));
 }

},

//退出登录
async loginOut({commit}){
  let result =   await reqLoginOut();
  if(result.code == 200){
     commit("LOGINOUT")
      return "ok"
  }else{
      return Promise.reject(new Error("退出登录失败"));
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