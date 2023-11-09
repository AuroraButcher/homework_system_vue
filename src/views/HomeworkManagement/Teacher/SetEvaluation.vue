<template>
  <!--批阅设置-->
  <div>
    <el-descriptions :column="3" title="批阅设置">
      <el-descriptions-item label="学生互评：">
        <span>批阅份数</span>
        <el-input style="width: 100px;margin-left: 10px" placeholder="输入份数" v-model="numOfEvaluation"></el-input>
        <span style="margin-left: 10px">份/人</span>
      </el-descriptions-item>
      <el-descriptions-item label="匿名批阅：">
        <el-switch style="margin-left: 10px" v-model="anonymous" active-text="是" inactive-text="否"></el-switch>
      </el-descriptions-item>
      <el-descriptions-item label="设置互评时间：">
        <el-date-picker
            v-model="time"
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
  </div>
  <div>
    <el-descriptions :column="3" title="最终成绩设置">
      <el-descriptions-item label="成绩来源及权重：">
        <span>教师打分占比:</span>
        <el-input type="number"
                  min="0"
                  max="100"
                  style="width: 70px;margin-left: 10px"
                  v-model="teaPercent"
                  @change="changeStuPercent"
                  oninput="if(value>100)value=100;if(value<0)value=0">
        </el-input>
        <span style="margin-left: 10px">%</span>
        <span style="margin-left: 100px">学生打分占比： {{ stuPercent }} %</span>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import {Setting} from "@element-plus/icons-vue";

export default {
  components: {Setting},
  data() {
    return {
      numOfEvaluation: null,
      anonymous: false,
      time: null,
      teaPercent: null,
      stuPercent: null,
    }
  },
  methods: {
    changeStuPercent() {
      this.stuPercent = 100 - this.teaPercent;
    }
  }
}
</script>

<style scoped>

</style>