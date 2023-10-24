import {createRouter, createWebHistory} from "vue-router"
//引入组件
//共享
import Cookie from "js-cookie";
import login from "../views/Shared/Login.vue";
import register from "../views/Shared/Register.vue";
import getBackPassword from "../views/Shared/GetBackPassword.vue";
import DetailedCourseInformation from "../views/Shared/DetailedInformation.vue"; //详细信息
// 学生端
import studentHome from "../views/Student/Home.vue";
import StudentHomePage from "../views/Student/StudentHomePage.vue";
// 教师端
import teacherHome from "../views/Teacher/Home.vue";
import TeacherHomePage from "../views/Teacher/TeacherHomePage.vue";
import TeacherViewCourse from "../views/Teacher/ViewCourse.vue"; // 查看课程
import TeacherChangeCourseInformation from "../views/Teacher/ChangeCourseInfo.vue";
// 管理员端
import administratorHome from "../views/Administrator/Home.vue"; //首页
import AdministratorHomePage from "../views/Administrator/AdministratorHomePage.vue";
import AdminViewCourse from "../views/Administrator/ViewCourse.vue"; // 查看课程
import AddCourse from "../views/Administrator/AddCourse.vue"; //添加课程
import AdminChangeCourseInformation from "../views/Administrator/ChangeCourseInfo.vue";


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
        component: studentHome,
        name: 'studentHome',
        children: [
            {
                path: '',
                component: StudentHomePage,
                name: 'studentHomePage'
            },
        ]
    },
    //教师端
    {
        path: "/teacherHome",
        component: teacherHome,
        name: 'teacherHome',
        children: [
            {
                path: '',
                component: TeacherHomePage,
                name: 'teacherHomePage'
            },
            {
                path: '/teacherViewCourse',
                component: TeacherViewCourse,
                name: 'teacherViewCourse'
            },
            {
                path: "/teacherDetailedCourseInformation",
                component: DetailedCourseInformation,
                name: 'teacherDetailedCourseInformation',
            },
            {
                path: "/teacherChangeCourseInformation",
                component: TeacherChangeCourseInformation,
                name: 'teacherChangeCourseInformation',
            },
        ]
    },
    // 管理员端
    {
        path: "/administratorHome",
        component: administratorHome,
        name: 'administratorHome',
        children: [
            {
                path: '',
                component: AdministratorHomePage,
                name: 'administratorHomePage'
            },
            {
                path: '/adminViewCourse',
                component: AdminViewCourse,
                name: 'adminViewCourse'
            },
            {
                path: "/adminAddCourse",
                component: AddCourse,
                name: 'adminAddCourse',
            },
            {
                path: "/adminDetailedCourseInformation",
                component: DetailedCourseInformation,
                name: 'adminDetailedCourseInformation',
            },
            {
                path: "/adminChangeCourseInformation",
                component: AdminChangeCourseInformation,
                name: 'adminChangeCourseInformation',
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