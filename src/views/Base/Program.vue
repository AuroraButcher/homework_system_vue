<template>
  <div class="hang">
    <el-input v-model="programName" style="width: 220px;"></el-input>
    <el-button style="margin-left: 10px">搜索</el-button>
    <el-button style="margin-left: auto">添加课程</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="课程编号" prop="no" width="140px"></el-table-column>
    <el-table-column label="课程名称" prop="name" width="140px"></el-table-column>
    <el-table-column label="课程教师" prop="teacher" width="140px"></el-table-column>
    <el-table-column fixed="right" label="操作">
      <template #default>
        <el-button link type="primary" @click="detail">详情</el-button>
        <el-button link type="primary" >修改</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "checkProgram",
  props:['tableData'],
  data(){
    return{
      programName:'',
      tableData:[
        {
          no:123,
          name:'嗡嗡嗡哇',
          teacher:'Nick'
        },
      ]
    }
  },
  methods:{
    detail(){
      this.$emit('showDetail',tableData)
    },
  },
}
</script>

<style scoped>
  .hang{
    display: flex;
  }
</style>