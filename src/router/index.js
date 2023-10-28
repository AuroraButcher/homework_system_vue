import {createRouter, createWebHistory} from "vue-router"
//共享
//用户管理
import Cookie from "js-cookie";
import login from "../views/UserManagerment/Login.vue";
import register from "../views/UserManagerment/Register.vue";
import getBackPassword from "../views/UserManagerment/GetBackPassword.vue";
//基础
import Home from "../views/Base/Home.vue";
import HomePage from "../views/Base/HomePage.vue";
import ViewCourse from "../views/CourseManagement/Shared/ViewCourse.vue"
//课程管理
import DetailedCourseInformation from "../views/CourseManagement/Shared/DetailedInformation.vue";

// 学生端
import StudentViewCourse from "../views/CourseManagement/Student/ViewCourse.vue";
// 教师端
import AssignHomework from "../views/HomeworkManagement/Teacher/AssignHomework.vue";
// 管理员端
import AddCourse from "../views/CourseManagement/Administrator/AddCourse.vue";
import ChangeCourseInformation from "../views/CourseManagement/Administrator/ChangeCourseInfo.vue";


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
        path: "/studentHome",
        component: Home,
        name: 'studentHome',
        children: [
            {
                path: '',
                component: HomePage,
                name: 'studentHomePage'
            },
            {
                path: '/studentViewCourse',
                component: StudentViewCourse,
                name: 'studentViewCourse'
            },
            {
                path: "/stuCourseInfo",
                component: DetailedCourseInformation,
                name: 'stuCourseInfo',
            },
        ]
    },
    //教师端
    {
        path: "/teacherHome",
        component: Home,
        name: 'teacherHome',
        children: [
            {
                path: '',
                component: HomePage,
                name: 'teacherHomePage'
            },
            {
                path: '/teacherViewCourse',
                component: ViewCourse,
                name: 'teacherViewCourse'
            },
            {
                path: "/teaCourseInfo",
                component: DetailedCourseInformation,
                name: 'teaCourseInfo',
            },
            {
                path: "/teaAssignHomework",
                component: AssignHomework,
                name: 'teaAssignHomework',
            }
        ]
    },
    // 管理员端
    {
        path: "/adminHome",
        component: Home,
        name: 'adminHome',
        children: [
            {
                path: '',
                component: HomePage,
                name: 'adminHomePage'
            },
            {
                path: '/adminViewCourse',
                component: ViewCourse,
                name: 'adminViewCourse'
            },
            {
                path: "/addCourse",
                component: AddCourse,
                name: 'addCourse',
            },
            {
                path: "/adminCourseInfo",
                component: DetailedCourseInformation,
                name: 'adminCourseInfo',
            },
            {
                path: "/changeCourseInfo",
                component: ChangeCourseInformation,
                name: 'changeCourseInfo',
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