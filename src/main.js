import {createApp} from 'vue'
import App from './App.vue'
//引入axios
import axios from "axios"
//引入路由
import router from "./router"
//引入Element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//使用图标
import elementIcon from "./plugins/icons"

const app = createApp(App)
//axios
app.config.globalProperties.$axios = axios
//使用router
app.use(router)
//Element-plus
app.use(ElementPlus)
//使用图标
app.use(elementIcon)
app.mount('#app')