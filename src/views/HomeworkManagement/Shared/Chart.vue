<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <h1>{{content}}</h1>
    <!--统计板-->
    <div >
      <el-row style="text-align: center;">
        <el-col :span="6">
          <el-statistic title="应交人数" :value="num.current"/>
        </el-col>
        <el-col :span="6">
          <el-statistic title="实交人数" :value="scoreDistribution.sum"/>
        </el-col>
        <el-col :span="6">
          <el-statistic title="未交人数" :value="num.current-scoreDistribution.sum"/>
        </el-col>
        <el-col :span="6">
          <el-statistic :value="(scoreDistribution.sum * 100.0 / num.current).toFixed(2)">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                提交率
              </div>
            </template>
            <template #suffix>%</template>
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
import {mapState} from "vuex";
import api from "../../../api";
import {ElMessage} from "element-plus";

export default {
  components: {Male, PageHeader},
  data() {
    return {
      head: "分数分布",
      content:'加载中',
      scoreDistribution: {
        one: null,
        two: null,
        three: null,
        four: null,
        five: null,
        sum: null,
      },
      num: {
        current: null,
      }
    }

  },
  created() {
    this.sabtxt();
    this.getData();
  },
  mounted() {

  },
  methods: {
    // 从后端获取数据
    getData() {
      api.scoreDistribution(this.homeworkNumber).then(res => {
        if (res.data.code === 20000) {
          this.scoreDistribution.one = res.data.data['90%-100%'];
          this.scoreDistribution.two = res.data.data['80%-90%'];
          this.scoreDistribution.three = res.data.data['70%-80%'];
          this.scoreDistribution.four = res.data.data['60%-70%'];
          this.scoreDistribution.five = res.data.data['0-60%'];
          this.scoreDistribution.sum = res.data.data['总数'];
          this.num.current = res.data.data['应交人数'];
          this.renderChart();
        }
      });
    },
    //渲染图表
    renderChart() {
      const myOption = {
        legend: {
          data: ["90%~100%(包含90%和100%)", "80%~90%(包含80%，不包含90%)", "70%~80%(包含70%，不包含80%)", "60%~70%(包含60%，不包含70%)", "0~60%(不包含60%)"],
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
                value: this.scoreDistribution.one,
                name: "90%~100%(包含90%和100%)"
              },
              {
                value: this.scoreDistribution.two,
                name: "80%~90%(包含80%，不包含90%)"
              },
              {
                value: this.scoreDistribution.three,
                name: "70%~80%(包含70%，不包含80%)"
              },
              {
                value: this.scoreDistribution.four,
                name: "60%~70%(包含60%，不包含70%)"
              },
              {
                value: this.scoreDistribution.five,
                name: "0~60%(不包含60%)"
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
    },
    //SABTXT评分法
    sabtxt(){
      if(this.homeworkNumber!==null){
        api.sabtxtScore(this.homeworkNumber).then(res=>{
          if(res.data.code===20000){
            if(res.data.data.error){
              this.content=res.data.data.error
            }else {
              this.content='分数生成成功'
            }
          }else {
            ElMessage.error(res.data.message)
          }
        })
      }
    }
  },
  computed: {
    ...mapState(['homeworkNumber','role'])
  }
}
</script>

<style scoped>

</style>