import {createRouter, createWebHistory} from "vue-router"
//引入组件
//基础
import Cookie from "js-cookie";
import login from "../views/Base/Login.vue";
import register from "../views/Base/Register.vue";
import getBackPassword from "../views/Base/GetBackPassword.vue";
// 学生端
import home from "../views/Base/Home.vue";
import About from "../views/Student/About.vue";
// 教师端
// 管理员端

//配置信息中需要页面的相关配置
const routes = [
    // 总界面
    {path: "/", redirect: "/login", name: 'origin',},
    // 登录界面
    {path: "/login", component: login, name: 'login',},
    // 注册界面
    {path: "/register", component: register, name: 'register',},
    // 找回密码界面
    {path: "/getBackPassword", component: getBackPassword, name: 'getBackPassword',},


    // 学生端
    {
        path: "/home",
        component: home,
        name: 'home',
        children: [
            {
                path: "/about",
                component: About,
                name: 'about',
            },
        ]
    },
    //教师端
    {
        path: "/home",
        component: home,
        name: 'home',
        children: [
            {
                path: "/about",
                component: About,
                name: 'about',
            },
        ]
    },
    // 管理员端
    {
        path: "/home",
        component: home,
        name: 'home',
        children: [
            {
                path: "/about",
                component: About,
                name: 'about',
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

//全局前置路由守卫
router.beforeEach((to, from, next) => {
    // 获取token
    const token = Cookie.get('number');
    if (!token && (to.name !== 'login' && to.name !== 'register' && to.name !== 'getBackPassword')) {
        next({name: 'login'});
    } else {
        next();
    }
})

export default router