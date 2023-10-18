import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    //这里放全局参数，比如用户登录信息
    state:{
        token:'',
        number:'',
        name:'',
    },
    mutations:{
    //这里是set方法，比如对该数据的修改、增加、删除等等。
        set_token: (state, token) => {
            state.token = token
            console.log(state.token);
        }
    },
    getters: {
        token: state => state.token,
    },
    actions: {
    },
    modules: {
    }
})
