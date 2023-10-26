import {createStore} from "vuex";
import createPersistedState from "vuex-persistedstate"

const store = createStore({
    state: {
        role: "",
        adminViewCourseNumber: null,
    },
    getters: {},
    // 进行修改
    mutations: {
        //设置角色
        setRole(state, value) {
            state.role = value;
        },
        //设置管理员查看课程的课程号
        setAdminViewCourse(state, value) {
            state.adminViewCourseNumber = value;
        },
    },
    actions: {},
    modules: {},
    plugins: [
        createPersistedState()
    ]
})
export default store;