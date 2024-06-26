const base = {
    //公共网址
    baseUrl: 'https://hyh31.top:3000',

    //角色网址
    administrator: '/admin',
    teacher: '/teacher',
    student: '/student',
    //其他网址
    // 登录
    LoginUrl: '/login',
    // 注册与注册发送邮箱验证码
    RegisterUrl: '/register',
    registerSendCode: '/mail/send/register',
    // 找回密码与找回密码发送邮箱验证码
    getBackPassword: '/reset',
    resetSendCode: '/mail/send/reset',
    // 修改密码
    changePassword: '/change',

//-----------------------------------------课程----------------------------------------------
    // 管理员查看课程
    showCourse: '/class/showList',
    // 课程详情--
    courseDetail: '/class/showInfo',
    // 添加课程
    addCourse: '/class/add',
    // 删除课程
    deleteCourse: '/class/delete',
    // 修改课程
    changeCourse: '/class/modify',
    // 学生查看课程
    studentShowCourse: '/class/studentList',
    // 教师查看课程
    teacherShowCourse: '/class/teacherList',

//-------------------------------------------作业和互评-------------------------------------------------------------------------
    // 添加作业
    addHomework: '/homework/addContent',
    // 删除作业
    deleteHomework: '/homework/delete',
    // 添加作业附件
    addHomeworkFile: '/homework/addFile',
    // 获得作业列表--
    getHomeworkList: '/homework/show',
    // 获得作业详细信息--
    getHomeworkInfo: '/homework/getInfo',
    // 修改作业
    changeHomework: '/homework/modify',
    // 提交作业
    submitHomework: '/homework/submit',
    //查看作业情况
    homeworkCondition: '/homework/showSubmitted',
    //学生查看作业
    stuViewHomework: '/homework/showForStudent',
    //获取学生作业详情
    getStuHomework: '/homework/getStudentHWInfo',
    // 下载作业附件
    downloadFiles: '/homework/download',
    // 删除作业附件
    deleteFiles: '/homework/deleteTeacherFile',
    //学生上传附件
    stuHomeworkFile: '/homework/submitFile',
    //获取互评作业名单
    getEvaluateList: '/score/getReview',
    //学生互评分数
    evaluateGrade: '/score/studentReview',
    //获取分数分布信息
    scoreDistribution: '/score/statistic',
    //学生评语提交
    stuComment:'/score/studentContent',
    //老师评语提交
    teaComment:'/score/teacherContent',
    //获取学生互评
    stuGetComment: '/score/getByHomework',
    //获取学生互评Byid
    stuGetCommentById: '/score/getById',
    //老师评分
    teaEvaluateGrade: '/score/teacherReview',
    //老师获取评分
    teaGetGrade: '/score/getTeacherScore',
    //互评相关设置
    setEvaluation: '/score/setReviewList',
    //修改互评设置
    changeEvaluation: '/score/modifyReview',
    //获得互评设置信息
    getEvaluation: '/score/getReviewInfo',
    //下载学生附件
    downloadStudentFile: '/homework/downloadStudent',
    //删除学生附件
    deleteStudentFile: '/homework/deleteStudentFile',
    //SABTXT评分
    sabtxtScore:'/score/sabtxt',

//-------------------------------------------导入-------------------------------------------------------------------------
    //批量导入教师
    teacherBulkImport: '/file/teacher',
    //批量导入学生
    studentBulkImport: '/file/student',
    //批量导入指定课程学生名单
    courseImportStudent: '/file/classStudent',
    //获得学生列表
    getStudentList: '/student/getList',
    // 获取老师列表
    getTeacherList: '/teacher/list',
    // 单个添加教师
    addSingleTeacher: '/admin/addTeacher',
    // 单个添加学生
    addSingleStudent: '/admin/addStudent',
    // 管理员修改教师密码
    changeTeacherPassword: '/admin/resetTeacher',
    // 管理员修改学生密码
    changeStudentPassword: '/admin/resetStudent',
    // 管理员删除教师账号
    adminDeleteTeacher: '/admin/deleteTeacher',
    // 管理员删除学生账号
    adminDeleteStudent: '/admin/deleteStudent',
    // 获得课程的选修学生名单‘
    getCourseStudentList: '/class/student',
//---------------优秀作业--------------------
    //添加优秀作业1
    addExcellent1: '/excellent/addBy1',
    //添加优秀作业2
    addExcellent2: '/excellent/addBy2',
    //修改优秀作业
    changeExcellent: '/excellent/addOrModify',
    //获取作业的所有优秀作业
    getExcellent: '/excellent/getPage',
    //获取优秀作业
    getOneExcellent: '/excellent/getInfo',
    //删除优秀作业
    deleteExcellent: '/excellent/delete',
//---------------消息------------------------
    stuGetMessage: '/reminder/list',
    //获取提醒消息
    getReminderDetail: '/reminder/info',
    //作业提醒
    teaRemind: '/reminder/homework',
    //已读消息
    isReadList:'/reminder/readList',
    //未读消息列表
    unReadList:'/reminder/unreadList',
//---------------评论区--------------------
    // 创建讨论区
    createDiscussion: '/discussion/open',
    // 关闭讨论区
    closeDiscussion: '/discussion/close',
    // 获得讨论区列表
    getDiscussionList: '/discussion/get',
    // 评论与回复
    addDiscussion: '/discussion/add',
    // 删除评论
    deleteDiscussion: '/discussion/delete',
    // 上传答案
    addAnswer: '/answer/addAnswer',
    // 上传答案附件
    addAnswerFile: '/answer/addFile',
    // 获得答案信息
    getAnswer: '/answer/get',
    // 下载答案附件
    downloadAnswerFiles: '/answer/download',
//---------------代码---------------------
    // 获得代码作业列表
    getCodeList: '/codeInfo/listForStudent',
    // 获得题面信息
    getCodeInfo: '/codeInfo/getInfo',
    //提交并评测代码
    submitCode: '/code/submit',
    // 获得评测记录
    getSubmitHistory: '/submission/getListForStudent',
    // 评测详情
    getSubmitDetail: '/submission/getInfo',
    // 代码查重
    checkCode:'/code/check',
    //添加代码作业
    addCodeHomework:'/homework/addCodeInfo',
    //jplag查重结果
    jplagSimilar:'/code/Jplag',
    //代码作业抄袭警告
    codeRemind:'/code/copy',
    //获得已通过学生
    getStudentCode:'/code/getAc',
    // 获得通过的代码块，内容
    getAc:'/code/getAc',
//------------恶意监测-----------------
    //获取恶意评分列表
    getMalicious: '/malicious/getList',
    //恶意评分监测
    zScore: '/malicious/zScore',
    //发送警告
    remindMalicious: '/reminder/score',
// ---------------相似度检测----------------
    //相似度检测1
    similarWords: '/similarity/words',
    //相似度检测2
    similarJieba: '/similarity/jieba',
    //判定为抄袭
    similarSet: '/similarity/setCopy',
    //未提交作业名单
    getNotSubmitList: '/homework/showUnSubmitted',
}
export default base