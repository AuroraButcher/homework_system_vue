import {createRouter, createWebHistory} from "vue-router"
//引入组件
import login from "../views/Login.vue";
import register from "../views/Register.vue";
import studentHome from "../views/student/Home.vue";

//配置信息中需要页面的相关配置
const routes = [
    {
        path: "/",
        redirect: "/student/login",
    },
    {
        path: "/student/login",
        component: login,
    },
    {
        path: "/register",
        component: register,
    },
    {
        path: "/home",
        component: studentHome,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router