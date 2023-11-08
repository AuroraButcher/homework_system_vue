<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--统计板-->
    <div>
      <el-row style="text-align: center;">
        <el-col :span="6">
          <el-statistic title="应交人数" :value="50"/>
        </el-col>
        <el-col :span="6">
          <el-statistic title="实交人数" :value="24"/>
        </el-col>
        <el-col :span="6">
          <el-statistic title="未交人数" :value="26"/>
        </el-col>
        <el-col :span="6">
          <el-statistic :value="24">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                提交率
              </div>
            </template>
            <template #suffix>/50</template>
          </el-statistic>
        </el-col>
      </el-row>
    </div>
    <!--饼图-->
    <div style="height:50vh;width:100%;margin-top: 20px" ref="chart"></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import PageHeader from "../../Base/PageHeader.vue";
import {Male} from "@element-plus/icons-vue";

export default {
  components: {Male, PageHeader},
  data() {
    return {
      head: "分数分布",
    }
  },
  mounted() {
    const myOption = {
      legend: {
        data: ["90~100(包含90和100)", "80~90(包含80，不包含90)", "70~80(包含70，不包含80)", "60~70(包含60，不包含70)", "0~60(不包含60)"],
        right: "5%",
        top: "30%",
        orient: "vertical"
      },
      title: {
        // 设置饼图标题，位置设为顶部居中
        text: "分数分布图",
        top: "0%",
        left: "center",
      },
      series: [
        {
          // 类型：饼图
          type: "pie",
          // 半径
          radius: '70%',
          // 调整图像位置,[左右,上下]
          center: ['40%', '50%'],
          label: {
            // 标签内容是否显示
            show: true,
            // 格式,b代表名称,c代表对应的值,d代表百分比
            formatter: "{b} : {c} ({d}%)"
          },
          data: [
            {
              value: 463,
              name: "90~100(包含90和100)"
            },
            {
              value: 395,
              name: "80~90(包含80，不包含90)"
            },
            {
              value: 157,
              name: "70~80(包含70，不包含80)"
            },
            {
              value: 149,
              name: "60~70(包含60，不包含70)"
            },
            {
              value: 147,
              name: "0~60(不包含60)"
            }
          ]
        }
      ]
    };
    const myChart = echarts.init(this.$refs.chart);
    myChart.setOption(myOption);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  }
}
</script>

<style scoped>

</style>