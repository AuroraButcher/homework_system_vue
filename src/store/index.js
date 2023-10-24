import {createStore} from "vuex";
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
    state: {
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
        setAdminViewCourse(state, value) {
            state.adminViewCourseNumber = value;
        }
    },
    actions: {},
    modules: {},
    plugins: [createPersistedState()]
})
export default store;