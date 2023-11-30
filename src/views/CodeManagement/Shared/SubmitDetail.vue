<template>
    <el-card>
        <template #header>
            <page-header :component="head" />
        </template>
        <div v-if="status === 'WRONG_ANSWER'">
            <h4>输入</h4>
            <pre v-highlightjs><code class="javascript">{{ inputCase }}</code></pre>
            <hr>
            <h4>期望的输出</h4>
            <pre v-highlightjs><code class="javascript">{{ outputCase }}</code></pre>
            <hr>
            <h4>实际输出</h4>
            <pre v-highlightjs><code class="javascript">{{ userOutput }}</code></pre>
        </div>
        <div v-else-if="status === 'ACCEPTED'">
            <h3>恭喜通过此题</h3>
        </div>
        <div v-else-if="status === 'COMPILE_ERROR'">
            <h3>编译错误!</h3>
        </div>
        <div v-else-if="status === 'TIME_LIMIT_EXCEEDED'">
            <h3>时间超限！</h3>
        </div>
        <div v-else-if="status === 'MEMORY_LIMIT_EXCEEDED'">
            <h3>内存超限！</h3>
        </div>
        <!-- <vue-mathjax :famula="content"></vue-mathjax> -->

        <hr>
        <h4>提交代码</h4>
        <VAceEditor v-model:value="content" @init="editorInit" :options="editorOptions" lang="c_cpp" theme="textmate"
            style="width: 90%; height: 500px; font-size: 16px !important;" />

    </el-card>
</template>
    
<script>
import PageHeader from "../../Base/PageHeader.vue";
import { mapState } from "vuex";
import api from "../../../api";
import { ElMessage } from "element-plus";
import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';


export default {
    setup() {
        ace.config.set(
            "basePath",
            "https://cdn.jsdelivr.net/npm/ace-builds@" + ace.version + "/src-noconflict/"
        );
    },
    name: "DetailSubmitHomework",
    components: { PageHeader, VAceEditor },
    created() {
        api.getSubmitDetail(this.submissionId).then(res => {
            if (res.data.code === 20000) {
                this.content = res.data.data.info.content;
                this.inputCase = res.data.data.info.testcaseInput;
                this.outputCase = res.data.data.info.testcaseOutput;
                this.userOutput = res.data.data.info.userOutput;
                this.status = res.data.data.info.status
            }
            else {
                ElMessage.error("加载失败");
            }
        })
    },
    data() {
        return {
            head: '作业提交详情',

            content: null,
            status: null,
            inputCase: null,
            outputCase: null,
            userOutput: null,
            numRange: null,

            subimitCode: null,
            editorOptions: {
                readOnly: true, // 设置为只读
            },


        }
    },
    methods: {
    },
    computed: {
        ...mapState(['homeworkNumber', 'homeworkID', 'studentNumber', 'role', 'index', 'courseNumber', "codeId", "submissionId"])
    }
}

</script>
  
  
<style scoped>
.textarea {
    width: 50%;
}
</style>