<template>
  <el-descriptions :column="1" border>
    <el-descriptions-item label="答案内容:">
      <div v-html="content"></div>
    </el-descriptions-item>
    <el-descriptions-item label="答案附件:">
      <ul v-for="(item,index) in files" :key="index">
        <li>
          <el-button type="success" link>
            <a @click="download(item)">{{ item }}</a>
          </el-button>
        </li>
      </ul>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import {mapState} from "vuex";
import api from "../../../api";
import {ElMessage} from "element-plus";
import Vditor from "vditor";

export default {
  components: {},
  data() {
    return {
      head: "查看答案",
      content: null,
      files: [],
      downloadAnswerFile: {
        classId: null,
        homeworkId: null,
        fileName: null,
      },
    }
  },
  mounted() {
    api.getAnswer(this.homeworkNumber).then(async res => {
      if (res.data.code === 20000) {
        this.content = await Vditor.md2html(res.data.data.answer.content);
        this.files = res.data.data.files;
      } else {
        console.log("获取答案失败");
      }
    })
  },
  methods: {
    download(item) {
      this.downloadAnswerFile.homeworkId = this.homeworkNumber;
      this.downloadAnswerFile.classId = this.courseNumber;
      this.downloadAnswerFile.fileName = item;
      console.log(this.downloadAnswerFile)
      api.downloadAnswerFiles(this.downloadAnswerFile).then(res => {
        if (res.data.code === 20000) {
          const url = res.data.data.url;
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', item);
          document.body.appendChild(link);
          link.click();
          link.remove();
          ElMessage.success("下载成功");
        } else {
          ElMessage.error("下载失败");
        }
      })
    },
  },
  computed: {
    ...mapState(['homeworkNumber', 'courseNumber'])
  },
}
</script>

<style scoped>

</style>