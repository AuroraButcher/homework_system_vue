<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--批阅设置-->
    <el-descriptions :column="3" title="批阅设置" border>
      <!--      <el-descriptions-item label="学生互评：">
              <span>批阅份数</span>
              <el-input style="width: 100px;margin-left: 10px" placeholder="输入份数" v-model="setData.numOfEvaluation"></el-input>
              <span style="margin-left: 10px">份/人</span>
            </el-descriptions-item>
            <el-descriptions-item label="匿名批阅：">
              <el-switch style="margin-left: 10px" v-model="setData.anonymous" active-text="是" inactive-text="否"></el-switch>
            </el-descriptions-item>-->
      <el-descriptions-item label="设置互评时间：">
        <el-date-picker
            v-model="setData.time"
            type="datetimerange"
            start-placeholder="Start date"
            end-placeholder="End date"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD hh:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="A hh:mm:ss"
            style="margin-left: 10px"
        />
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions :column="3" title="最终成绩设置" border style="margin-top: 10px">
      <el-descriptions-item label="成绩来源及权重：">
        <span>学生打分占比:</span>
        <el-input type="number"
                  min="0"
                  max="100"
                  style="width: 70px;margin-left: 10px"
                  v-model="setData.studentPercent"
                  @change="changeStuPercent"
                  oninput="if(value>100)value=100;if(value<0)value=0">
        </el-input>
        <span style="margin-left: 10px">%</span>
        <span style="margin-left: 100px">教师打分占比： {{ setData.teacherPercent }} %</span>
      </el-descriptions-item>
    </el-descriptions>
<!--TODO: bug，点击设置，学生占比自动除以100-->
    <el-button type="primary" style="margin-top: 10px" @click="setEvaluation">设置</el-button>
  </el-card>
</template>

<script>
import {Setting} from "@element-plus/icons-vue";
import {mapState} from "vuex";
import api from "../../../api";
import {ElMessage} from "element-plus";
import PageHeader from "../../Base/PageHeader.vue";

export default {
  components: {PageHeader, Setting},
  data() {
    return {
      head: "作业互评设置",
      setData: {
        /*numOfEvaluation: null,
        anonymous: false,*/
        time: null,
        stuPercent: null,
        studentPercent:null,
        teacherPercent: null,
        homeworkId: null,
      },
    }
  },
  methods: {
    // 根据学生打分占比更改教师打分占比
    changeStuPercent() {
      this.setData.teacherPercent = 100 - this.setData.studentPercent;
    },
    // 进行互评设置
    setEvaluation() {
      this.setData.stuPercent = this.setData.stuPercent / 100;
      this.setData.homeworkId = this.homeworkNumber;
      api.setEvaluation(this.setData).then(res => {
        if (res.data.code === 20000) {
          ElMessage.success("设置成功");
        } else {
          ElMessage.error("设置失败");
        }
      })
    }
  },
  computed: {
    ...mapState(['homeworkNumber'])
  },
  created() {
    this.setData.homeworkId = this.homeworkNumber;
    api.getEvaluation(this.setData.homeworkId).then(res => {
      if(res.data.code === 20000){
        console.log(res.data.data.review.studentRate)
        this.setData.studentPercent = res.data.data.review.studentRate*100;
        this.setData.teacherPercent = 100 - this.setData.studentPercent;
        this.setData.time=[res.data.data.review.start,res.data.data.review.end];
      }
      else
      {
        console.log("查看互评信息失败")
      }
    })
  }
}
</script>

<style scoped>

</style>