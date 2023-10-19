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
    // 注册发送邮箱验证码
    registerSendCode(number) {
        return axios.post(path.baseUrl + path.registerSendCode, null, {
            params: {
                id: number,
            }
        });
    },
    // 找回密码
    getBackPassword(ruleForm) {
        return axios.post(path.baseUrl + path.student + path.getBackPassword, {number: ruleForm.number, password: ruleForm.password}, {
            params: {
                code: ruleForm.captcha,
            }
        });
    },
    // 找回密码发送邮箱验证码
    getBackSendCode(number) {
        return axios.post(path.baseUrl + path.resetSendCode, null, {
            params: {
                id: number,
            }
        });
    },
    // 修改密码
    studentChangePassword(ruleForm) {
        return axios.post(path.baseUrl + path.student + path.changePassword, {number: ruleForm.number, password: ruleForm.newPassword}, {
            params: {
                old_pwd: ruleForm.password,
            }
        });
    },
    deleteAccount(ruleForm) {
        return axios.post(path.baseUrl + path.student + path.delete, {number: ruleForm.number});
    },
}
export default api