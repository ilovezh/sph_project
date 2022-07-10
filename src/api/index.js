// 所有api接口进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax";
// 三级联动接口
//   /api/product/getBaseCategoryList get 无参数

export const reqCategoryList = ()=>{
    // 发请求 axios, axios返回的结果为一个Promise对象
  return   requests({url:"/product/getBaseCategoryList",method:"get"});
}

// 获取banner(Home首页轮播图的接口)
export const reqGetBannerList = ()=>{
  return   mockRequests({url:"/banner",method:"get"});
}

// 获取floor(floor轮播图的接口)
export const reqGetFloorList = ()=>{
  return   mockRequests({url:"/floor",method:"get"});
}

// 获取搜索商品接口,请求地址/api/list,请求方式post,需要带参数
// 当前这个接口,因为请求是需要传递参数的,data的值需要为一个对象,所以给服务器传递参数,至少是一个空对象
// url为请求地址,method为请求方式,data为请求参数
export const  reqGetProductList = (params)=>{
return requests({url:"/list",method:"post",data:params})
}

// 获取产品详情信息的接口,请求地址 /api/item/{ skuId },请求参数产品id
export const  reqGoodsInfo = (skuid)=>{
  return requests({url:`/item/${skuid}`,method:"get"})
  }

//将产品添加到购物车中或者更新某一个产品的个数 /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId,skuNum) =>{
  return requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})
}


// 获取购物车列表数据 /api/cart/cartList  get 请求
export const reqCartList = () =>{
  return requests({url:"cart/cartlist",method:"get"})
}

// 获取验证码 user/passport/sendCode/{phone}
export const reqGetPhone = (phone)=>{
  return requests({url:`user/passport/sendcode/${phone}`,method:"get"})
}

// 完成注册    /api/user/passport/register
export const  reqUserRegister = (data)=>{
  return requests({url:"user/passport/register",data,method:"post"})
}


// 登录
export const reqUserLogin = (data)=>{
  return requests({url:"user/passport/login",data,method:"post"})
}

// 获取用户信息[需要带着用户的token]向服务器要用户的信息

export const reqUserInfo = ()=>{
  return requests({url:"user/passport/auth/getuserinfo",method:"get"})
}

// 退出登录
//  /api/user/passport/logout
export const reqLoginOut = ()=>{
  return requests({url:"user/passport/logout",method:"get"})
}

// 获取用户地址信息
export const reqAddress = ()=>requests({url:"user/userAddress/auth/findUserAddressList",method:"get"});

// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder = (tradeNo,data)=>{
  requests({url:`order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"post"})
}


// 获取支付订单状态
export const reqPayStatus = (orderId)=>{
  requests({url:`payment/weixin/status/${orderId}`,method:"get"})
}

// 获取个人中心的数据
// api/order/auth/{page}/{limit} get
export const reqMyorderList =(page,limit)=>{
  requests({url:`order/${page}/${limit}`,method:"get"})
}