import {createRouter, createWebHistory} from "vue-router"
//引入组件
import Cookie from "js-cookie";
import login from "../views/Login.vue";
import register from "../views/Register.vue";
import getBackPassword from "../views/GetBackPassword.vue";
import home from "../views/Home.vue";
import changePassword from "../views/ChangePassword.vue";
import About from "../views/Student/About.vue";
import abc from "../views/Student/abc.vue";

//配置信息中需要页面的相关配置
const routes = [
    // 总界面
    {
        path: "/",
        redirect: "/login",
        name: 'origin',
    },
    // 登录界面
    {
        path: "/login",
        component: login,
        name: 'login',
    },
    // 注册界面
    {
        path: "/register",
        component: register,
        name: 'register',
    },
    // 找回密码界面
    {
        path: "/getBackPassword",
        component: getBackPassword,
        name: 'getBackPassword',
    },
    // 首页
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
            {
                path: "/abc",
                component: abc,
                name: 'abc',
            },
        ]
    },
    // 修改密码界面
    {
        path: "/change",
        component: changePassword,
        name: 'change',
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