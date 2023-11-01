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
      <el-descriptions-item label="作业内容:">
        <div v-html="content"></div>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import api from "../../../api";
import {mapState} from "vuex";
import Vditor from "vditor";

export default {
  components: {PageHeader},
  created() {
    if (this.homeworkNumber !== null) {
      api.getHomeworkInfo(this.homeworkNumber).then(async res => {
        if (res.data.code === 20000) {
          this.homeworkName = res.data.data.info.name;
          this.resubmit = (res.data.data.info.resubmit === 1) ? "是" : "否";
          this.start = this.formatTimestamp(res.data.data.info.start);
          this.end = this.formatTimestamp(res.data.data.info.end);
          this.content = await Vditor.md2html(res.data.data.info.content);
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
    }
  },
  methods: {
    // 时间戳转换为指定的格式
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }
  },
  computed: {
    ...mapState(['homeworkNumber'])
  }
}
</script>

<style scoped>

</style>