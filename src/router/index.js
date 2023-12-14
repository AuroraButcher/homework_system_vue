import {createRouter, createWebHistory} from "vue-router"
//共享
//用户管理
import Cookie from "js-cookie";
import login from "../views/UserManagerment/Shared/Login.vue";
import register from "../views/UserManagerment/Student/Register.vue";
import getBackPassword from "../views/UserManagerment/Student/GetBackPassword.vue";
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
import homeworkCondition from "../views/HomeworkManagement/Teacher/EvaluateCondition.vue";
import detailSubmitHomework from "../views/HomeworkManagement/Shared/EvaluateHomework.vue";
import HomeworkInfo from "../views/HomeworkManagement/Student/ShowHomeworkInfo.vue";
// 分数相关
import Chart from "../views/HomeworkManagement/Shared/Chart.vue";
import evaluateHomework from "../views/HomeworkManagement/Student/EvaluateHomeworkList.vue";
import SetEvaluation from "../views/HomeworkManagement/Teacher/SetEvaluation.vue";
import TeacherList from "../views/UserManagerment/Administrator/TeacherList.vue";
import StudentList from "../views/UserManagerment/Administrator/StudentList.vue";
import ViewExcellent from "../views/HomeworkManagement/Shared/ViewExcellent.vue";
import excellent from "../views/HomeworkManagement/Shared/Excellent.vue";
import ShowCourseStudent from "../views/CourseManagement/Shared/ShowCourseStudent.vue";
import DiscussionArea from "../views/DiscussionArea/DiscussionArea.vue";
import SubmitAnswer from "../views/HomeworkManagement/Teacher/SubmitAnswer.vue";
import ViewAnswer from "../views/HomeworkManagement/Shared/ViewAnswer.vue";
import Malicious from "../views/HomeworkManagement/Teacher/Malicious.vue";
// TODO 相似度检测
import similarCheck from "../views/HomeworkManagement/Teacher/SimilarCheck.vue";
// TODO 教师添加代码作业
import AddCodeHomework from "../views/CodeManagement/Teacher/AddCodeHomework.vue";

import CodeList from "../views/CodeManagement/Shared/CodeList.vue"
import DetailCodeInformation from "../views/CodeManagement/Shared/DetailCodeInformation.vue";
import SubmitCode from "../views/CodeManagement/Student/SubmitCode.vue"
import submissionResult from "../views/CodeManagement/Shared/SubmitResult.vue"
import submissionDetail from "../views/CodeManagement/Shared/SubmitDetail.vue"
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
        meta: {title: "首页"},
        children: [
            {
                // 学生首页--
                path: '',
                component: HomePage,
                name: 'studentHomePage',
            },
            // 课程模块
            {
                // 学生查看课程--
                path: '/viewCourse',
                component: ViewCourse,
                name: 'studentViewCourse',
                meta: {title: "课程列表"},
            },
            {
                // 学生课程详情--
                path: "/courseInfo",
                component: DetailedCourseInformation,
                name: 'stuCourseInfo',
                meta: {title: "课程详情"},
            },
            // 作业模块
            {
                // 学生作业列表--
                path: "/stuViewHomework",
                component: ViewHomework,
                name: 'stuViewHomework',
                meta: {title: "作业列表"},
            },
            {
                // 学生作业详情--
                path: "/detailedHomework",
                component: DetailedHomework,
                name: 'detailedHomework',
                meta: {title: "作业详情"},
            },
            {
                // 学生提交作业
                path: "/submitHomework",
                component: SubmitHomework,
                name: 'submitHomework',
                meta: {title: "提交作业"},
            },
            {
                path: "/homeworkInfo",
                component: HomeworkInfo,
                name: 'homeworkInfo',
                meta: {title: "作业提交详情"},
            },
            {
                // 分数分布
                path: "/distribution",
                component: Chart,
                name: 'FractionalDistribution',
                meta: {title: "分数状况"},
            },
            {
                // 学生互评作业列表
                path: "/evaluateHomework",
                component: evaluateHomework,
                name: 'stuEvaluateHomework',
                meta: {title: "作业互评"},
            },
            {
                // 查看优秀作业
                path: "/viewExcellent",
                component: ViewExcellent,
                name: 'viewExcellent',
                meta: {title: "优秀作业"},
            },
            {
                // 优秀作业详情
                path: "/viewExcellentDetail",
                component: excellent,
                name: 'Excellent',
                meta: {title: "优秀作业详情"},
            },
            {
                // 讨论区
                path: "/discussion",
                component: DiscussionArea,
                name: 'discussion',
                meta: {title: "讨论区"},
            },
            {
                // 查看答案
                path: "/viewAnswer",
                component: ViewAnswer,
                name: 'viewAnswer',
                meta: {title: "查看答案"},
            },
            {
                //代码题目列表
                path: "/codeList",
                component: CodeList,
                name: 'codeList',
                meta: {title: '题目列表'},
            },
            {
                //题面详情
                path: "/CodeInformation",
                component: DetailCodeInformation,
                name: 'CodeInformation',
                meta: {title: "代码题目"},
            },
            {
                //提交代码界面
                path: "/submitCode",
                component: SubmitCode,
                name: 'submitCode',
                meta: {title: "提交代码"},
            },
            {
                //提交结果
                path: "/submissionResult",
                component: submissionResult,
                name: "submissionResult",
                meta: {title: '提交结果'}
            },
            {
                //评测详情
                path: '/submissionDetail',
                component: submissionDetail,
                name:"submissionDetail",
                meta: {title: '评测详情'}
            }
        ]
    },
    //教师端
    {
        path: "/teacherHome",
        component: Home,
        name: 'teacherHome',
        meta: {title: "首页"},
        children: [
            {
                // 教师首页--
                path: '',
                component: HomePage,
                name: 'teacherHomePage',
            },
            // 课程模块
            {
                // 教师查看课程--
                path: '/viewCourse',
                component: ViewCourse,
                name: 'teacherViewCourse',
                meta: {title: "课程列表"},
            },
            {
                // 教师课程详情--
                path: "/courseInfo",
                component: DetailedCourseInformation,
                name: 'teaCourseInfo',
                meta: {title: "作业详情"},
            },
            // 作业模块
            {
                // 教师布置作业
                path: "/teaAssignHomework",
                component: AssignHomework,
                name: 'teaAssignHomework',
                meta: {title: "布置作业"},
            },
            {
                // 教师作业列表--
                path: "/teaViewHomework",
                component: ViewHomework,
                name: 'teaViewHomework',
                meta: {title: "作业列表"},
            },
            {
                // 教师作业详情--
                path: "/detailedHomework",
                component: DetailedHomework,
                name: 'detailedHomework',
                meta: {title: "作业详情"},
            },
            {
                // 教师修改作业信息
                path: "/teaChangeHomework",
                component: changeHomework,
                name: 'teaChangeHomework',
                meta: {title: "修改作业信息"},
            },
            {
                // 提交状况
                path: "/homeworkCondition",
                component: homeworkCondition,
                name: 'teaHomeworkCondition',
                meta: {title: "提交状况"},
            },
            {
                path: "/detailSubmitHomework",
                component: detailSubmitHomework,
                name: 'teaDetailSubmitHomework',
                meta: {title: "提交详情"},
            },
            {
                // 分数分布
                path: "/distribution",
                component: Chart,
                name: 'FractionalDistribution',
                meta: {title: "分数分布"},
            },
            {
                // 作业互评相关设置
                path: "/setDistribution",
                component: SetEvaluation,
                name: 'setDistribution',
                meta: {title: "互评设置"},
            },
            {
                // 教师查看选修名单
                path: "/teaShowCourseStudentList",
                component: ShowCourseStudent,
                name: 'teaShowCourseStudentList',
                meta: {title: "选修名单"},
            },
            {
                // 讨论区
                path: "/discussion",
                component: DiscussionArea,
                name: 'discussion',
                meta: {title: "讨论区"},
            },
            {
                // 上传答案
                path: "/submitAnswer",
                component: SubmitAnswer,
                name: 'submitAnswer',
                meta: {title: "上传答案"},
            },
            {
                //恶意评分检测
                path: "/malicious",
                component: Malicious,
                name: "malicious",
                meta: {title: "恶意评分检测"},
            },
            {
                //查看相似作业
                path: "/similarCheck",
                component: similarCheck,
                name: "similarCheck",
                meta: {title: "查看相似作业"},
            },
            {
                //添加代码作业
                path: "/addCodeHomework",
                component: AddCodeHomework,
                name: "addCodeHomework",
                meta: {title: "添加代码作业"},
            },
        ]
    },
    // 管理员端
    {
        path: "/adminHome",
        component: Home,
        name: 'adminHome',
        meta: {title: "首页"},
        children: [
            {
                // 管理员首页--
                path: '',
                component: HomePage,
                name: 'adminHomePage',
            },
            // 课程列表
            {
                // 管理员课程列表--
                path: '/viewCourse',
                component: ViewCourse,
                name: 'adminViewCourse',
                meta: {title: "课程列表"},
            },
            {
                // 管理员添加课程
                path: "/addCourse",
                component: AddCourse,
                name: 'addCourse',
                meta: {title: "添加课程"},
            },
            {
                // 管理员课程详情--
                path: "/courseInfo",
                component: DetailedCourseInformation,
                name: 'adminCourseInfo',
                meta: {title: "课程详情"},
            },
            {
                // 管理员修改课程信息
                path: "/changeCourseInfo",
                component: ChangeCourseInformation,
                name: 'changeCourseInfo',
                meta: {title: "修改课程信息"},
            },
            {
                // 管理员查看教师列表
                path: "/teacherList",
                component: TeacherList,
                name: 'teacherList',
                meta: {title: "教师列表"},
            },
            {
                // 管理员查看学生列表
                path: "/studentList",
                component: StudentList,
                name: 'studentList',
                meta: {title: "学生列表"},
            },
            {
                // 管理员查看选修名单
                path: "/adminShowCourseStudentList",
                component: ShowCourseStudent,
                name: 'adminShowCourseStudentList',
                meta: {title: "课程选修名单"},
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