<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--详细信息-->
    <el-descriptions :column="2" border>
      <el-descriptions-item label="作业名称:">{{ homeworkName }}</el-descriptions-item>
      <el-descriptions-item label="是否允许多次提交:">{{ resubmit }}</el-descriptions-item>
      <el-descriptions-item label="开始时间:">{{ start }}</el-descriptions-item>
      <el-descriptions-item label="截止时间:">{{ end }}</el-descriptions-item>
      <el-descriptions-item label="作业内容:" span="2">
        <div v-html="content"></div>
      </el-descriptions-item>
      <el-descriptions-item label="作业附件:">
        <ul v-for="(item,index) in files" :key="index">
          <li>
            <el-button type="success" link>
              <a @click="download(item)">{{ item }}</a>
            </el-button>
          </li>
        </ul>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import api from "../../../api";
import {mapState} from "vuex";
import Vditor from "vditor";
import {ElMessage} from "element-plus";

export default {
  components: {PageHeader},
  created() {
    if (this.homeworkNumber !== null) {
      api.getHomeworkInfo(this.homeworkNumber).then(async res => {
        if (res.data.code === 20000) {
          this.homeworkName = res.data.data.info.name;
          this.resubmit = (res.data.data.info.resubmit === 1) ? "是" : "否";
          this.start = res.data.data.info.start;
          this.end = res.data.data.info.end;
          this.content = await Vditor.md2html(res.data.data.info.content);
          this.files = res.data.data.files;
        }
      })
    }
  },
  data() {
    return {
      head: '作业详情',
      homeworkName: null,
      resubmit: false,
      start: null,
      end: null,
      content: null,
      files: [],
      fileName: null,
      downloadData: {
        id: null,
        classID: null,
        downloadFileName: null,
      }
    }
  },
  methods: {
    download(item) {
      this.downloadData.id = this.homeworkNumber;
      this.downloadData.classID = this.courseNumber;
      this.downloadData.downloadFileName = item;
      api.downloadFiles(this.downloadData).then(res => {
        if (res.data.code === 20000) {
          const url = res.data.data.url;
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', item);
          document.body.appendChild(link);
          link.click();
          link.remove();
          console.log(item)
          ElMessage.success("下载成功");
        } else {
          ElMessage.error("下载失败");
        }
      })
    },
  },
  computed: {
    ...mapState(['homeworkNumber', 'courseNumber'])
  }
}
</script>

<style scoped>

</style>