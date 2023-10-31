const base = {
    //公共网址
    baseUrl: 'http://hyh31.top:3000',

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
    // 删除账户
    delete: '/delete',

    // 展示课程
    showCourse: '/class/showList',
    // 课程详情
    courseDetail: '/class/showInfo',
    // 添加课程
    addCourse: '/class/add',
    // 删除课程
    deleteCourse: '/class/delete',
    // 修改课程
    changeCourse: '/class/modify',

    // 添加作业
    addHomework: '/homework/addContent',
    // 删除作业
    deleteHomework: '/homework/delete',
    // 修改作业
    modifyHomework: '/homework/modify',
    // 添加作业附件
    addHomeworkFile: '/homework/addFile',
    // 获得作业详细信息
    getHomeworkInfo: '/homework/getInfo',
    // 获得作业列表
    getHomeworkList:'/homework/show',
}
export default base