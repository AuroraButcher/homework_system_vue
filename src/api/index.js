import axios from "../utils/request";
import path from "./path";

const api = {
    //学生登录
    getStudentLogin(ruleForm) {
        return axios.post(path.baseUrl + path.student + path.LoginUrl, {number: ruleForm.number, password: ruleForm.password});
    },
    sendCode(number) {
        return axios.post(path.baseUrl + path.sendCode, null, {
            params: {
                id: number,
            }
        });
    }
}
export default api