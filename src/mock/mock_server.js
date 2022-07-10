// 引入mockjs
import Mock from "mockjs";
// 引入json数据格式[json数据格式没有对外暴露,却可以引入]
// webpack默认对外暴露:图片 、JSON数据格式
import banner from "./banner.json";
import floor  from "./floor.json";
// mock数据:第一个参数:请求地址;第二个参数,请求数据
Mock.mock("/mock/banner",{code:200,data:banner}) // 模拟首页大的轮播图的数据
Mock.mock("/mock/floor",{code:200,data:floor}) // 模拟楼层的数据

