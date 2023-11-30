<template>
    <el-card>
        <template #header>
            <!--页头-->
            <page-header :component='head' />
        </template>
        <el-table :data="tableData" border style="width:100%;margin-top: 10px" :row-class-name="rowClassName" :Key="key">
            <el-table-column label="评测ID" type="index" width="100px">
                <template #default="scope">
                   {{ scope.row.id }}
                </template>
            </el-table-column>
            <!-- <el-table-column label="课程编号" prop="id" width="100px" v-if="false"></el-table-column> -->
            <el-table-column label="评测时间" prop="name" width="200px">
                <template #default="scope">
                   {{ scope.row.date }}
                </template>
            </el-table-column>
            <el-table-column label="评测状态" prop="name" width="100px">
                <template #default="scope">
                    <el v-if="scope.row.status === 'ACCEPTED'" style="color: green;font-weight: bold;">
                        AC
                    </el>
                    <el v-else-if="scope.row.status === 'WRONG_ANSWER'" style="color: RED;font-weight: bold;">
                        WA
                    </el>
                    <el v-else-if="scope.row.status === 'pending'" style="color: grey;font-weight: bold;">
                        pending
                    </el>
                    <el v-else-if="scope.row.status === 'TIME_LIMIT_EXCEEDED'" style="color: RED;font-weight: bold;">
                        TLE
                    </el>
                    <el v-else-if="scope.row.status === 'MEMORY_LIMIT_EXCEEDED'" style="color: RED;font-weight: bold;">
                        MLE
                    </el>
                    <el v-else-if="scope.row.status === 'SEGMENTATION_FAULT'" style="color: RED;font-weight: bold;">
                        SF
                    </el>
                    <el v-else-if="scope.row.status === 'COMPILE_ERROR'" style="color: RED;font-weight: bold;">
                        CE
                    </el> 

                </template>

            </el-table-column>
            <el-table-column fixed="right" label="提交记录">
                <template #default="scope">
                    <el-link type="primary" link @click="showDetailedSubmission(scope)"
                        v-show="role === 'teacher' || role === 'student'">评测详情</el-link>
                </template>
            </el-table-column>
        </el-table>
        <!--横线-->
        <hr style="margin-top: 10px">
        <!--页码-->
        <el-pagination v-model:current-page="page.currentPage" v-model:page-size="page.pageSize" :total="page.total"
            @current-change="handlePageChange" :hide-on-single-page="false" />
    </el-card>
</template>
  
<script>
import { ElMessage, ElMessageBox } from "element-plus";
import Cookies from "js-cookie";
import { mapState } from "vuex";
import api from "../../../api/index.js";
import PageHeader from "../../Base/PageHeader.vue";

export default {
    name: "checkProgram",
    components: { PageHeader },
    data() {
        return {
            head: '提交记录',
            dialogFileVisible: false,
            fileList: [],
            courseName: '',
            key: 1,
            tableData: [
                {
                    // 课程编号、课程简介、教师编号、课程名称、最大选修人数、现在的数量、教师名称
                    "id": null,
                    "title": null,
                    "start": null,
                    "end": null,
                }
            ],
            page: {
                codeInfoId: null,
                teacherName: '',
                teacherNumber: '',
                studentNumber: '',
                pageNo: 1,
                pageSize: 10,
                total: null,
            },
        }
    },
    created() {
        if (this.role === 'administrator') {
            api.showCourse(this.page).then(response => {
                if (response.data.code === 20000) {
                    this.page.total = response.data.data.classInfo.total;
                    this.tableData = response.data.data.classInfo.records;
                } else {
                    console.log("查看课程列表失败");
                }
            })
        } else if (this.role === 'student') {
            this.page.codeInfoId = this.codeId;
            this.page.studentNumber = Cookies.get('number');
            api.getSubmitListForStudent(this.page).then(respose => {
                if (respose.data.code === 20000) {
                    this.page.total = respose.data.data.list.total;
                    this.tableData = respose.data.data.list.records;
                } else {
                    console.log("查看课程列表失败");
                }
            })
        } else {
            this.page.teacherNumber = Cookies.get('number');
            api.teacherShowCourse(this.page).then(response => {
                if (response.data.code === 20000) {
                    this.page.total = response.data.data.classInfo.total;
                    this.tableData = response.data.data.classInfo.records;
                } else {
                    console.log("查看课程列表失败");
                }
            })
        }
    },
    methods: {
        showDetailedSubmission(scope) {
            this.$store.commit('setSubmissionId', scope.row.id);
            this.$router.push('/submissionDetail');
        }
    },
    computed: {
        ...mapState(['role', 'courseNumber', 'codeId'])
    }
}
</script>
  
<style scoped>
.hang {
    display: flex;
}
</style>