import {createRouter, createWebHistory} from "vue-router"

//引入组件

//配置信息中需要页面的相关配置
const routes = [
    {
        path: "/",
        component: homeView,
    },
]

const router = createRouter({
    //createWebHashHistory路径带/#,此种方式不需要后台做重定向
    //createWebHistory路径不带/#,此种方式需要后台做重定向
    history: createWebHistory(),
    routes
})

export default router