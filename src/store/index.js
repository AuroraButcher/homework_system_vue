import {createStore} from "vuex";
import createPersistedState from "vuex-persistedstate"

const store = createStore({
    state: {
        //管理员：admin，教师：teacher，学生：student
        role: "",
        courseNumber: null,
        courseName:null,
        homeworkNumber: null,
        homeworkName:null,
        homeworkID:null,
        studentNumber:null,
        index:null,
    },
    getters: {},
    // 进行修改
    mutations: {
        //设置角色
        setRole(state, value) {
            state.role = value;
        },
        //设置查看课程的课程号
        setCourseNumber(state, value) {
            state.courseNumber = value;
        },
        //设置查看布置作业的课程号
        setHomeworkNumber(state, value) {
            state.homeworkNumber = value;
        },
        //设置查看课作业的课程号
        setCourseName(state, value) {
            state.courseName = value;
        },
        //设置查看课作业的作业号
        setHomeworkName(state, value) {
            state.homeworkName = value;
        },
        //设置查看学生作业的学生作业号
        setHomeworkID(state, value) {
            state.homeworkID = value;
        },
        //设置查看学生作业的作业序号
        setIndex(state, value) {
            state.index = value;
        },
        //设置查看学生作业的学生作业号
        setStudentNumber(state, value) {
            state.studentNumber = value;
        },
    },
    actions: {},
    modules: {},
    plugins: [
        createPersistedState()
    ]
})
export default store;