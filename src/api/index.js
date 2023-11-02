import axios from "../utils/request";
import path from "./path";


const api = {
    // 学生注册
    studentRegister(ruleForm) {
        return axios.post(path.baseUrl + path.student + path.RegisterUrl, {
            number: ruleForm.number,
            password: ruleForm.password
        }, {
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
        return axios.post(path.baseUrl + path.student + path.LoginUrl, {
            number: ruleForm.number,
            password: ruleForm.password
        });
    },
    // 找回密码
    getBackPassword(ruleForm) {
        return axios.post(path.baseUrl + path.student + path.getBackPassword, {
            number: ruleForm.number,
            password: ruleForm.newPassword
        }, {
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
        return axios.post(path.baseUrl + path.student + path.changePassword, {
            number: ruleForm.number,
            password: ruleForm.newPassword
        }, {
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
        return axios.post(path.baseUrl + path.teacher + path.RegisterUrl, {
            number: ruleForm.number,
            password: ruleForm.password
        });
    },
    // 教师登录
    /*teacherLogin(ruleForm) {

    },*/
    // 管理员登录
    adminLogin(ruleForm) {
        return axios.post(path.baseUrl + path.administrator + path.LoginUrl, {
            username: ruleForm.number,
            password: ruleForm.password
        });
    },
    // 获得教师列表
    getTeacherList() {
        return axios.get(path.baseUrl + path.getTeacherList);
    },


    //管理员展示搜索课程
    showCourse(tableData) {
        return axios.get(path.baseUrl + path.showCourse, {
            params: {
                name: tableData.courseName,
                teacher: tableData.teacherName,
                pageNo: tableData.currentPage,
                pageSize: tableData.pageSize,
            }
        })
    },
    //课程详情--
    showCourseDetail(id){
        return axios.get(path.baseUrl+path.courseDetail,{
            params:{
                id:id
            }
        })
    },
    // 添加课程
    addCourse(ruleForm) {
        return axios.post(path.baseUrl + path.addCourse, {
            info: ruleForm.info,
            name: ruleForm.name,
            teacher: ruleForm.teacher,
            num: ruleForm.num
        });
    },
    //删除课程
    deleteCourse(courseId) {
        return axios.post(path.baseUrl + path.deleteCourse, null, {
            params: {
                id: courseId,
            }
        })
    },
    //修改课程
    changeCourse(ruleForm) {
        return axios.post(path.baseUrl + path.changeCourse, null, {
            params: {
                id: ruleForm.id,
                info: ruleForm.info
            }
        })
    },
    // 学生查看搜索课程
    studentShowCourse(tableData) {
        return axios.get(path.baseUrl + path.studentShowCourse, {
            params: {
                number: tableData.studentNumber,
                name: tableData.courseName,
                pageNo: tableData.currentPage,
                pageSize: tableData.pageSize,
            }
        })
    },
    // 教师查看搜索课程
    teacherShowCourse(tableData) {
        return axios.get(path.baseUrl + path.teacherShowCourse, {
            params: {
                number: tableData.teacherNumber,
                name: tableData.courseName,
                pageNo: tableData.currentPage,
                pageSize: tableData.pageSize,
            }
        })
    },


    // 添加作业
    addHomework(ruleForm) {
        return axios.post(path.baseUrl + path.addHomework, {
            classId: ruleForm.classId,
            start: ruleForm.time[0],
            end: ruleForm.time[1],
            content: ruleForm.content,
            resubmit: (ruleForm.multiple === true ? 1 : 0),
            name: ruleForm.title,
        });
    },
    // 查看作业列表
    getHomeworkList(ruleForm) {
        return axios.get(path.baseUrl + path.getHomeworkList, {
            params: {
                classID: ruleForm.classID,
                pageNo: ruleForm.pageNo,
                pageSize: ruleForm.pageSize
            }
        })
    },
    // 获得作业详细信息
    getHomeworkInfo(id) {
        return axios.get(path.baseUrl + path.getHomeworkInfo, {
            params: {
                id: id
            }
        });
    },
    //修改作业
    changeHomework(homeworkData) {
        return axios.post(path.baseUrl + path.changeHomework,{
            start:homeworkData.time[0],
            end:homeworkData.time[1],
            content:homeworkData.content,
            resubmit:homeworkData.multiple,
            name:homeworkData.title
        },{
            params:{
                id:homeworkData.id,
            }
        })
    },
    // 删除作业
    deleteHomework(homeworkId) {
        return axios.post(path.baseUrl + path.deleteHomework, null, {
            params: {
                id: homeworkId
            }
        })
    },
    // 上传作业
    submitHomework(homeworkData) {
        return axios.post(path.baseUrl + path.submitHomework, {
            answer: homeworkData.content,
            homeworkId: homeworkData.homeworkId,
            classId: 18,
            studentNumber: homeworkData.studentNumber,
            date: homeworkData.time
        })
    },
    // 添加作业附件
    addHomeworkFile(param) {
        return axios.post(path.baseUrl + path.addHomeworkFile, param);
    }
}
export default api