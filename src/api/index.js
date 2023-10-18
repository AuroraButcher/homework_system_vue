import axios from "../utils/request";
import path from "./path";

const api = {
    // 学生登录
    studentLogin(ruleForm) {
        return axios.post(path.baseUrl + path.student + path.LoginUrl, {number: ruleForm.number, password: ruleForm.password});
    },
    // 学生注册
    studentRegister(ruleForm) {
        return axios.post(path.baseUrl + path.student + path.RegisterUrl, {number: ruleForm.number, password: ruleForm.password}, {
            params: {
                code: ruleForm.captcha,
            }
        });
    },
    // 教师注册
    teacherRegister(ruleForm) {
        return axios.post(path.baseUrl + path.teacher + path.RegisterUrl, {number: ruleForm.number, password: ruleForm.password});
    },
    sendCode(number) {
        return axios.post(path.baseUrl + path.sendCode, null, {
            params: {
                id: number,
            }
        });
    },
    studentChangePassword(ruleForm){
        return axios.post(path.baseUrl+path.student+path.changePassword,{number:ruleForm.number,password:ruleForm.newPassword})
    } ,
}
export default api