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
    // 教师登录
    teacherLogin(ruleForm) {
        return axios.post(path.baseUrl + path.teacher + path.LoginUrl, {
            number: ruleForm.number,
            password: ruleForm.password
        });
    },
    // 管理员登录
    adminLogin(ruleForm) {
        return axios.post(path.baseUrl + path.administrator + path.LoginUrl, {
            username: ruleForm.number,
            password: ruleForm.password
        });
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
            classId: homeworkData.classId,
            studentNumber: homeworkData.studentNumber,
        })
    },
    // 添加作业附件
    addHomeworkFile(param) {
        return axios.post(path.baseUrl + path.addHomeworkFile, param);
    },
    // 查看作业情况
    homeworkCondition(params){
        return axios.get(path.baseUrl+path.homeworkCondition,{
            params:{
                classID:params.classID,
                homeworkID:params.homeworkID,
                pageNo:params.pageNo,
                pageSize:params.pageSize,
            }
        })
    },
    //学生查看作业
    stuViewHomework(tableData){
        return axios.get(path.baseUrl+path.stuViewHomework,{
            params:{
                classID:tableData.classID,
                pageNo:tableData.pageNo,
                pageSize:tableData.pageSize,
                studentID:tableData.studentID
            }
        })
    },
    //获取学生作业详情
    getStuHomework(params) {
        return axios.get(path.baseUrl + path.getStuHomework, {
            params: {
                id: params
            }
        })
    },
    // 下载作业附件
    downloadFiles(formData) {
        return axios.post(path.baseUrl + path.downloadFiles, null, {
            params: {
                id: formData.id,
                classID: formData.classID,
                fileName: formData.downloadFileName,
            }
        })
    },
    //学生上传附件
    stuHomeworkFile(tableData) {
        return axios.post(path.baseUrl + path.stuHomeworkFile, tableData);
    },
    //获取互评作业名单
    stuGetEvaluateList(tableData){
        return axios.get(path.baseUrl + path.getEvaluateList,{
            params:{
                homeworkId:tableData.homeworkNumber,
                studentNumber:tableData.studentNumber
            }
        })
    },
    //学生互评分数
    stuEvaluateGrade(tableData) {
        return axios.post(path.baseUrl + path.evaluateGrade, null, {
            params: {
                id: tableData.id,
                score: tableData.grade
            }
        })
    },
    //获取分数分布信息
    scoreDistribution(homeworkID) {
        return axios.get(path.baseUrl + path.scoreDistribution, {
            params: {
                homeworkId: homeworkID,
            }
        })
    },
    //学生评语
    stuComment(data) {
        return axios.post(path.baseUrl + path.stuComment, {
            id:data.id,//互评id
            content:data.comment
        })
    },
    //老师评语
    teaComment(data) {
        return axios.post(path.baseUrl + path.teaComment, {
            id:data.id,//评价的作业id
            content:data.comment
        })
    },
    //老师评分
    teaEvaluateGrade(data){
        return axios.post(path.baseUrl + path.teaEvaluateGrade,null,{
            params:{
                score:data.grade,
                homeworkStudentId:data.homeworkId
            }
        })
    },
    //获取学生互评
    stuGetComment(data) {
        return axios.get(path.baseUrl + path.stuGetComment, {
            params: {
                homeworkStudentId: data.homeworkId,//评的学生作业id
                studentNumber: data.studentNumber//在评价别人的学生的id
            }
        })
    },
    //互评相关设置
    setEvaluation(setData) {
        return axios.post(path.baseUrl + path.setEvaluation, {
            start: setData.time[0],
            end: setData.time[1],
            homeworkId: setData.homeworkId,
            studentRate: setData.stuPercent,
        })
    },
    // 下载学生附件
    downloadStudentFiles(formData) {
        return axios.post(path.baseUrl + path.downloadStudentFile, null, {
            params: {
                id: formData.id,
                classID: formData.classID,
                fileName: formData.downloadFileName,
                studentNumber: formData.studentNumber,
            }
        })
    },
    //获取老师评分
    teaGetGrade(data) {
        return axios.get(path.baseUrl + path.teaGetGrade, {
            params: {
                homeworkStudentId: data.homeworkId
            }
        })
    },
    //批量导入教师
    teacherBulkImport(file) {
        return axios.post(path.baseUrl + path.teacherBulkImport, file);
    },
    //批量导入学生
    studentBulkImport(file) {
        return axios.post(path.baseUrl + path.studentBulkImport, file);
    },
    //批量给课程导入学生名单
    courseImportStudent(fileData) {
        return axios.post(path.baseUrl + path.courseImportStudent, fileData);
    },
    //获得学生列表
    getStudentList(pageData) {
        return axios.get(path.baseUrl + path.getStudentList, {
            params: {
                pageNo: pageData.pageNo,
                pageSize: pageData.pageSize,
                name:pageData.studentName,
            }
        })
    },
    // 获得教师列表
    getTeacherList(pageData) {
        return axios.get(path.baseUrl + path.getTeacherList, {
            params: {
                pageNo: pageData.pageNo,
                pageSize: pageData.pageSize,
                name:pageData.teacherName,
            }
        });
    },
    // 单个添加教师
    addSingleTeacher(ruleForm){
        return axios.post(path.baseUrl + path.addSingleTeacher, null,{
            params:{
                number:ruleForm.number,
                name:ruleForm.addName,
            }
        })
    },
    // 单个添加学生
    addSingleStudent(ruleForm){
        return axios.post(path.baseUrl + path.addSingleStudent, null,{
            params:{
              number:ruleForm.number,
              name:ruleForm.addName,
            }
        })
    },
    // 管理员修改教师密码
    changeTeacherPassword(ruleForm){
        return axios.post(path.baseUrl + path.changeTeacherPassword, null,{
            params:{
                number:ruleForm.number,
                pwd:ruleForm.password,
            }
        })
    },
    // 管理员修改学生密码
    changeStudentPassword(ruleForm){
        return axios.post(path.baseUrl + path.changeStudentPassword, null,{
            params:{
                number:ruleForm.number,
                pwd:ruleForm.password,
            }
        })
    },
    //添加优秀作业
    addExcellent(data){
          return axios.post(path.baseUrl+path.addExcellent2,{
              homeworkStudentId:data.homeworkID,
              content:data.content
          })
    },
    //修改优秀作业
    modifyExcellent(data){
        return axios.post(path.baseUrl+path.changeExcellent,{
            homeworkStudentId:data.homeworkID,
            content:data.content
        })
    },
    //删除优秀作业
    deleteExcellent(data){
        return axios.post(path.baseUrl+path.deleteExcellent,null,{
            params:{
                homeworkStudentId:data.homeworkID
            }
        })
    },
    //查看一个优秀作业
    getOneExcellent(data){
        return axios.get(path.baseUrl+path.getOneExcellent,{
            params:{
                homeworkStudentId:data
            }
        })
    },
    //查看一个作业的所有优秀作业
    getExcellent(data){
        return axios.get(path.baseUrl+path.getExcellent,{
            params:{
                homeworkId:data.homeworkNumber,
                pageNo:data.pageNo,
                pageSize:data.pageSize
            }
        })
    },
    // 管理员删除教师账号
    adminDeleteTeacher(number){
        return axios.post(path.baseUrl + path.adminDeleteTeacher, null,{
            params:{
                number:number,
            }
        })
    },
    // 管理员删除学生账号
    adminDeleteStudent(number){
        return axios.post(path.baseUrl + path.adminDeleteStudent, null,{
            params:{
                number:number,
            }
        })
    },
}
export default api