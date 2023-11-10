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
//课程管理
import ViewCourse from "../views/CourseManagement/Shared/ViewCourse.vue"; //查看课程（管理员、教程）
import DetailedCourseInformation from "../views/CourseManagement/Shared/DetailedInformation.vue"; //课程详情（三端共用）
import AddCourse from "../views/CourseManagement/Administrator/AddCourse.vue"; //添加课程（管理员）
import ChangeCourseInformation from "../views/CourseManagement/Administrator/ChangeCourseInfo.vue"; //修改课程信息（管理员、教师）
// 作业管理
import ViewHomework from "../views/HomeworkManagement/Shared/ViewHomework.vue"; //查看作业（教师、学生）
import AssignHomework from "../views/HomeworkManagement/Teacher/AssignHomework.vue"; //发布作业(教师)
import DetailedHomework from "../views/HomeworkManagement/Shared/DetailedHomework.vue";
import changeHomework from "../views/HomeworkManagement/Teacher/ChangeHomework.vue";
import SubmitHomework from "../views/HomeworkManagement/Student/SubmitHomework.vue";
import homeworkCondition from "../views/HomeworkManagement/Teacher/HomeworkCondition.vue";
import detailSubmitHomework from "../views/HomeworkManagement/Shared/DetailSubmitHomework.vue";
// 分数相关
import Chart from "../views/HomeworkManagement/Shared/Chart.vue";
import evaluateHomework from "../views/HomeworkManagement/Student/EvaluateHomework.vue";
import SetEvaluation from "../views/HomeworkManagement/Teacher/SetEvaluation.vue";

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
                // 学生首页--
                path: '',
                component: HomePage,
                name: 'studentHomePage'
            },
            // 课程模块
            {
                // 学生查看课程--
                path: '/viewCourse',
                component: ViewCourse,
                name: 'studentViewCourse'
            },
            {
                // 学生课程详情--
                path: "/courseInfo",
                component: DetailedCourseInformation,
                name: 'stuCourseInfo',
            },
            // 作业模块
            {
                // 学生作业列表--
                path: "/stuViewHomework",
                component: ViewHomework,
                name: 'stuViewHomework',
            },
            {
                // 学生作业详情--
                path: "/detailedHomework",
                component: DetailedHomework,
                name: 'detailedHomework',
            },
            {
                // 学生提交作业
                path: "/submitHomework",
                component: SubmitHomework,
                name: 'submitHomework'
            },
            {
                // 分数分布
                path: "/distribution",
                component: Chart,
                name: 'FractionalDistribution'
            },
            {
                // 学生互评作业列表
                path: "/evaluateHomework",
                component: evaluateHomework,
                name: 'stuEvaluateHomework'
            }
        ]
    },
    //教师端
    {
        path: "/teacherHome",
        component: Home,
        name: 'teacherHome',
        children: [
            {
                // 教师首页--
                path: '',
                component: HomePage,
                name: 'teacherHomePage'
            },
            // 课程模块
            {
                // 教师查看课程--
                path: '/viewCourse',
                component: ViewCourse,
                name: 'teacherViewCourse'
            },
            {
                // 教师课程详情--
                path: "/courseInfo",
                component: DetailedCourseInformation,
                name: 'teaCourseInfo',
            },
            // 作业模块
            {
                // 教师布置作业
                path: "/teaAssignHomework",
                component: AssignHomework,
                name: 'teaAssignHomework',
            },
            {
                // 教师作业列表--
                path: "/teaViewHomework",
                component: ViewHomework,
                name: 'teaViewHomework',
            },
            {
                // 教师作业详情--
                path: "/detailedHomework",
                component: DetailedHomework,
                name: 'detailedHomework',
            },
            {
                // 教师修改作业信息
                path:"/teaChangeHomework",
                component: changeHomework,
                name:'teaChangeHomework'
            },
            {
                path: "/homeworkCondition",
                component: homeworkCondition,
                name: 'teaHomeworkCondition'
            },
            {
                path: "/detailSubmitHomework",
                component: detailSubmitHomework,
                name: 'teaDetailSubmitHomework'
            },
            {
                // 分数分布
                path: "/distribution",
                component: Chart,
                name: 'FractionalDistribution'
            },
            {
                // 作业互评相关设置
                path: "/setDistribution",
                component: SetEvaluation,
                name: 'setDistribution'
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
                // 管理员首页--
                path: '',
                component: HomePage,
                name: 'adminHomePage'
            },
            // 课程列表
            {
                // 管理员课程列表--
                path: '/viewCourse',
                component: ViewCourse,
                name: 'adminViewCourse'
            },
            {
                // 管理员添加课程
                path: "/addCourse",
                component: AddCourse,
                name: 'addCourse',
            },
            {
                // 管理员课程详情--
                path: "/courseInfo",
                component: DetailedCourseInformation,
                name: 'adminCourseInfo',
            },
            {
                // 管理员修改课程信息
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