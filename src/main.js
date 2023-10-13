import {createApp} from 'vue'
import App from './App.vue'
//引入axios
import axios from "axios"
//引入路由
import router from "./router"
//引入Element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
//axios
app.config.globalProperties.$axios = axios
//使用router
app.use(router)
//Element-plus
app.use(ElementPlus)

app.mount('#app')