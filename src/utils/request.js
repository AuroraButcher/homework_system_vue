import axios from "axios";
import querystring from "querystring";

const errorHandle = (status, info) => {
    switch (status) {
        case 400:
            console.log("语义错误");
            break;
        case 401:
            console.log("服务器认证失败");
            break;
        case 403:
            console.log("服务器拒绝访问");
            break;
        case 404:
            console.log("地址错误");
            break;
        case 500:
            console.log("服务器遇到意外");
            break;
        case 502:
            console.log("服务器无响应");
            break;
        default:
            console.log("info");
            break;
    }
}
//创建对象
const instance = axios.create({
    // 网络请求的公共配置
    timeout: 5000,
})

//最常用：拦截器
//发送数据之前
instance.interceptors.request.use(
    config => {
        if (config.method === "POST") {
            config.data = querystring.stringify(config.data);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)
//获取数据之前
instance.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response;
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        const {response} = error;
        errorHandle(response.status, response.info);
        return error;
    }
)
export default instance