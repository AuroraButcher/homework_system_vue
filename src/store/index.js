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
        //设置查看课作业的课程号
        setHomeworkNumber(state, value) {
            state.homeworkNumber = value;
        },
        //设置查看课作业的课程号
        setCourseName(state, value) {
            state.courseName = value;
        },//设置查看课作业的课程号
        setHomeworkName(state, value) {
            state.homeworkName = value;
        },
    },
    actions: {},
    modules: {},
    plugins: [
        createPersistedState()
    ]
})
export default store;