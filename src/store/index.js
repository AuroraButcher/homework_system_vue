import {createStore} from "vuex";
import createPersistedState from "vuex-persistedstate"

const store = createStore({
    state: {
        role: "",
        adminViewCourseNumber: null,
    },
    // 对Vuex中的数据进行过滤：使用方法
    getters: {
        getAdminViewCourseNumber(state) {
            return state.adminViewCourseNumber;
        }
    },
    // 进行修改
    mutations: {
        setRole(state, value) {
            state.role = value;
        },
        setAdminViewCourse(state, value) {
            state.adminViewCourseNumber = value;
        }
    },
    actions: {},
    modules: {},
    plugins: [
        createPersistedState()
    ]
})
export default store;