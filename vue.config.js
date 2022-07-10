module.exports = {
  // 关闭eslint
  lintOnSave:false,
  // 代理跨域
  devServer:{
    proxy:{
      "/api":{
        target:"http://127.0.0.1:7000",
        pathRewrite:{"^/api":""}
      }
    }
  },
  productionSourceMap:false
}