// Vue插件一定暴露一个对象
let myPlugins = {

};
myPlugins.install = function(Vue,options){
    // 自定义组件被Vue.use时,自定义事件的install方法被调用
    // Vue.prototype.$bus:任何组件都可以使用
    // Vue.directive
    // Vue.component
    // Vue.filter
    // 自定义指令，自定义执行的名字,自定义指令对应的回调函数
    Vue.directive(options.name,(element,params)=>{
        console.log(element,params)
        
        // element <h1 data-v-891b3da6="">ABC</h1>
        // params
        //  {name: 'upper', rawName: 'v-upper', value: 'abc', expression: 'msg', modifiers: {…}, …}
        // def: {bind: ƒ, update: ƒ}
        // expression: "msg"
        // modifiers: {}
        // name: "upper"
        // oldArg: undefined
        // oldValue: "abc"
        // rawName: "v-upper"
        // value: "abc"
        // [[Prototype]]: Object
        element.innerHTML = params.value.toUpperCase();
    })

}
export default myPlugins