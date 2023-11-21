<template>
  <el-card style="height: 100%" :body-style="{padding:'2px'}">
    <template #header>
      <!--页头-->
      <page-header :component='head'/>
    </template>
    <!--评论查看-->
    <div class="common-layout" v-for="item in discussion">
      <!--非回复-->
      <div v-if="item.reply === null">
        <el-container>
          <!--头像-->
          <el-card style="height: 150px">
            <el-aside width="80px">
              <el-avatar :size="80" src="src/assets/头像.jpg"></el-avatar>
              <p style="text-align: center;margin-top: 5px">{{ item.number }}</p>
            </el-aside>
          </el-card>
          <!--评论-->
          <el-container>
            <el-card style="width: 100%;height: 150px" :body-style="{padding:'0px'}">
              <el-main style="padding: 10px">
                <p>{{ item.content }}</p>
                <div style="display: flex;text-align: center">
                  <p style="font-size: 12px">发表于 2023-11-20 15:34</p>
                  <el-button link type="primary" style="margin-left: auto">回复</el-button>
                  <el-button link type="danger" style="margin-left: 10px" v-show="number === item.number || role === 'teacher'" @click="deleteDiscussion(item.id)">删除</el-button>
                </div>
              </el-main>
            </el-card>
          </el-container>
        </el-container>
      </div>
      <!--回复-->
      <div v-else>
        <el-container>
          <!--头像-->
          <el-card style="height: 200px">
            <el-aside width="80px">
              <el-avatar :size="80" src="src/assets/头像.jpg" class="avatar"></el-avatar>
              <p style="text-align: center;margin-top: 5px">{{ item.number }}</p>
            </el-aside>
          </el-card>
          <!--回复内容-->
          <el-container>
            <el-card style="width: 100%;height: 200px" :body-style="{padding:'0px'}">
              <el-main style="padding: 10px">
                <p>回复 <span style="color: cornflowerblue">{{ item.reply }}</span> : <span style="color: #67c23a">{{ item.replyContent }}</span></p>
                <hr>
                <p>{{ item.content }}</p>
                <div style="display: flex;text-align: center">
                  <p style="font-size: 12px">发表于 2023-11-20 15:34</p>
                  <el-button link type="primary" style="margin-left: auto">回复</el-button>
                  <el-button link type="danger" style="margin-left: 10px" v-show="number === item.number || role === 'teacher'" @click="deleteDiscussion(item.id)">删除</el-button>
                </div>
              </el-main>
            </el-card>
          </el-container>
        </el-container>
      </div>
    </div>
    <hr>
    <!--评论输入框-->
    <div style="display: flex;text-align: center;width: 100%;padding: 10px">
      <el-input type="textarea" :rows="5" v-model="addDiscussionData.content" placeholder="写下你的评论"></el-input>
      <el-button type="success" style="width: 150px;margin-left: 10px" @click="addDiscussion">发表评论</el-button>
    </div>
  </el-card>
</template>

<script>
import PageHeader from "../Base/PageHeader.vue";
import Cookies from "js-cookie";
import {mapState} from "vuex";
import api from "../../api";
import {ElMessage} from "element-plus";

export default {
  components: {PageHeader},
  data(){
    return {
      head: "讨论区",
      number: Cookies.get('number'),
      discussion: [],
      // 获取信息列表请求
      getDiscussionData:{
        homeworkId:null,
        pageNo:1,
        pageSize:10,
        total:null,
      },
      // 发表评论请求
      addDiscussionData: {
        homeworkID:null,
        studentNumber:null,
        teacherNumber:null,
        reply:"",
        content:null,
      },
      // 回复评论请求
      replyDiscussionData: {
        homeworkID:null,
        studentNumber:null,
        teacherNumber:null,
        reply:null,
        content:null,
      },
    }
  },
  created() {
    this.refresh();
  },
  methods:{
    refresh(){
      this.getDiscussionData.homeworkId = this.homeworkNumber;
      api.getDiscussionList(this.getDiscussionData).then(res => {
        if(res.data.code === 20000){
          this.getDiscussionData.total = res.data.data.discussion.total;
          this.discussion = res.data.data.discussion.records;
        }
      })
    },
    // 发表评论
    addDiscussion(){
      this.addDiscussionData.homeworkId = this.homeworkNumber;
      if(this.role === 'teacher'){
        this.addDiscussionData.teacherNumber = Cookies.get('number');
        this.addDiscussionData.studentNumber = null;
      }else{
        this.addDiscussionData.studentNumber = Cookies.get('number');
        this.addDiscussionData.teacherNumber = null;
      }
      if(this.addDiscussionData.content !== null && this.addDiscussionData.content !== ""){
        api.addDiscussion(this.addDiscussionData).then(res => {
          if(res.data.code === 20000) {
            ElMessage.success("添加成功");
            this.refresh();
          }else{
            ElMessage.error("添加失败");
          }
        })
      }else{
        ElMessage.error("评论不能为空");
      }
    },
    deleteDiscussion(id){
      api.deleteDiscussion(id).then(res=>{
        if(res.data.code === 20000) {
          ElMessage.success("删除成功");
          this.refresh();
        }else{
          ElMessage.error("删除失败");
        }
      })
    }
  },
  computed:{
    ...mapState(['role','homeworkNumber'])
  }
}
</script>

<style scoped>
.common-layout {
  border: #181818;
  margin-top: 1px;
}
</style>