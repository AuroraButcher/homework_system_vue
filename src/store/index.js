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