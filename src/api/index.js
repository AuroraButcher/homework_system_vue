import axios from "../utils/request";
import path from "./path";

const api = {
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
    // 学生登录
    studentLogin(ruleForm) {
        return axios.post(path.baseUrl + path.student + path.LoginUrl, {number: ruleForm.number, password: ruleForm.password});
    },
    // 找回密码
    getBackPassword(ruleForm) {
        return axios.post(path.baseUrl + path.student + path.getBackPassword, {number: ruleForm.number, password: ruleForm.newPassword}, {
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
    // 注销账号
    deleteAccount(ruleForm) {
        return axios.post(path.baseUrl + path.student + path.delete, {number: ruleForm.number});
    },
    // 教师注册
    teacherRegister(ruleForm) {
        return axios.post(path.baseUrl + path.teacher + path.RegisterUrl, {number: ruleForm.number, password: ruleForm.password});
    },
    // 教师登录
    /*teacherLogin(ruleForm) {

    },*/
    // 管理员登录
    adminLogin(ruleForm) {
        return axios.post(path.baseUrl + path.administrator + path.LoginUrl, {username: ruleForm.number, password: ruleForm.password});
    },
    //展示课程
    showCourse(ruleForm) {
        return axios.get(path.baseUrl + path.showCourse, {
            params: {
                name: ruleForm.name,
                teacher: ruleForm.teacher,
                pageNo: ruleForm.currentPage,
                pageSize: ruleForm.pageSize,
            }
        })
    },
    //删除课程
    deleteCourse(ruleForm) {
        return axios.get(path.baseUrl + path.deleteCourse, {
            params: {
                id: ruleForm.number,
            }
        })
    },
}
export default api