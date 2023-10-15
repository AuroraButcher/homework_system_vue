import {createRouter, createWebHistory} from "vue-router"
//引入组件
import login from "../views/Login.vue";
import register from "../views/Register.vue";
import getBackPassword from "../views/GetBackPassword.vue";
import studentHome from "../views/Home.vue";
import Cookie from "js-cookie";


//配置信息中需要页面的相关配置
const routes = [
    // 总界面
    {
        path: "/",
        redirect: "/login",
        name:'origin'},
    // 登录界面
    {
        path: "/login",
        component: login,
        name:'login'},
    // 注册界面
    {
        path: "/register",
        component: register,
        name:'register'},
    // 修改密码界面
    {
        path: "/changePassword",
        component: getBackPassword,
        name:'changePassword'},


    // 学生端
    // 首页
    {
        path: "/student/home",
        component: studentHome,},

    //教师端


    //管理员端
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//全局前置路由守卫
router.beforeEach((to, from, next) => {
    // 获取token
    const token = Cookie.get('number')
    if(!token&& (to.name !== 'login' && to.name !== 'register')){
        next({ name: 'login' })
    }else {
        next()
    }
})
export default router