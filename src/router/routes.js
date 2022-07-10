export default [
    {
        path:"/home",
        component:()=>import("../pages/Home/indexHome.vue"),
       meta:{show:true}
    },
    {
        path:"/paysuccess",
        component:()=>import("@/pages/PaySuccess"),
        meta:{show:true}
    },
    {
        path:"/center",
        component:()=>import( "@/pages/Center"),
        meta:{show:true},
        // 子路由
        children:[
            {
                path:"myorder",
                component:()=>import("@/pages/Center/myOrder"),
            },
            {
                path:"/center/grouporder",
                component:()=>import("@/pages/Center/groupOrder"),
            },
            {
                path:"/center",
                redirect:"/center/myorder"
            }
        ]
    },
    {
        path:"/search/:keyword?",
        component:()=>import("../pages/Search/indexSearch.vue"),
        meta:{show:true},
        name:"search",
      //函数写法,可以将params参数,query参数,通过props传递给路由组件
      props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})
      

    },
    {
        path:"/register",
        component:()=>import("@/pages/Register"),
        meta:{show:false}
    },
    {
        path:"/login",
        component:()=>import("@/pages/Login"),
        meta:{show:false}
    },
    {
        path:"/pay",
        component:()=>import("@/pages/Pay"),
        meta:{show:true},
        beforeEnter:(to,from,next)=>{
                // from.path == "/trade"表示
                // 如果是从 "/trade"路由跳转到的 "/pay"路由,那么就放行
                if(from.path == "/trade"){
                    next();
                }else{
                    // 如果不是从 "/trade"路由跳转到的 "/pay"路由,路由跳转到 from.path对应的路由
                    next(false);
                    // 表示路由跳转到 from.path对应的路由,即停留在当前路由
                }
            }
        },
    {
        // 当路由跳转,跳转到某一个路由组件需要携带params参数时,在书写路由时需要参数占位
        // 当点击商品的图片的时候,跳转到详情页面,在路由跳转的时候需要带上产品的id给详情页面,传递的是params参数,所以需要进行路由参数的占位
        path:"/detail/:skuid",
        component:()=>import("@/pages/Detail/index.vue"),
        meta:{show:true}
    },
    {
        // 当路由跳转,跳转到某一个路由组件需要携带params参数时,在书写路由时需要参数占位
        // 当点击商品的图片的时候,跳转到详情页面,在路由跳转的时候需要带上产品的id给详情页面,传递的是params参数,所以需要进行路由参数的占位
        path:"/addcartsuccess",
        component:()=>import("@/pages/AddCartSuccess"),
        name:"addcartSuccess",
        meta:{show:true}
    },
    {
        // 当路由跳转,跳转到某一个路由组件需要携带params参数时,在书写路由时需要参数占位
        // 当点击商品的图片的时候,跳转到详情页面,在路由跳转的时候需要带上产品的id给详情页面,传递的是params参数,所以需要进行路由参数的占位
        path:"/shopcart",
        component:()=>import("@/pages/ShopCart"),
        name:"shopcart",
        meta:{show:true}
    },
    {
        path:"/trade",
        component:()=>import("@/pages/Trade"),
        meta:{show:true},
        // 路由独享守卫
        beforeEnter:(to,from,next)=>{
            // from.path == "/shopcart"表示
            // 如果是从 "/shopcart"路由跳转到的 "/trade"路由,那么就放行
            if(from.path == "/shopcart"){
                next();
            }else{
                // 如果不是从 "/shopcart"路由跳转到的 "/trade"路由,路由跳转到 from.path对应的路由
                next(false);
                // 表示路由跳转到 from.path对应的路由,即停留在当前路由
            }
        }
    },
    {
        // 重定向,在项目跑起来的时候,如果匹配不到任何路由,不管访问的目录是什么 ,立马定向到首页
        path:"*",
        // path:"*"表示访问任意目录
        redirect:"/home"
    }
]