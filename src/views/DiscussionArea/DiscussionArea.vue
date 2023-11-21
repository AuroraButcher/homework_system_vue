<template>
  <el-card style="height: 100%" :body-style="{padding:'2px'}">
    <template #header>
      <!--页头-->
      <page-header :component='head'/>
    </template>
    <div v-for="(item,index) in discussion" :key="index">
      <!--纯评论-->
      <div class="box" v-if="item.reply === 0">
        <div style="background-color: rgb(250,240,230);width: 100px" v-if="item.teacherNumber === '-1' && item.studentNumber !== '-1'">
          <el-avatar shape="square" :size="60" src="src/assets/头像.jpg" class="avatar">Student</el-avatar>
          <p style="text-align: center;margin-top: 5px">{{ item.studentNumber }}</p>
        </div>
        <div style="background-color: rgb(240,255,240);width: 100px" v-if="item.teacherNumber !== '-1' && item.studentNumber === '-1'">
          <el-avatar shape="square" :size="60" src="src/assets/头像.jpg" class="avatar"></el-avatar>
          <p style="text-align: center;margin-top: 5px">{{ item.teacherNumber }}</p>
        </div>
        <div style="background-color: rgb(245,245,245);width: 100px" v-if="item.teacherNumber === '-1' && item.studentNumber === '-1'">
          <el-avatar shape="square" :size="60" src="src/assets/头像.jpg" class="avatar">已删除</el-avatar>
          <p style="text-align: center;margin-top: 5px">已删除</p>
        </div>
        <div style="margin-left:10px;width: calc(100% - 100px)">
          <p style="font-size: 18px;color: #1397c5">{{ item.content }}</p>
          <div style="display: flex;text-align: center;margin-top:70px">
            <p style="font-size: 14px;color: rgb(67,79,148)">发表于 {{ item.time }}</p>
            <el-button type="primary" style="margin-left: auto;margin-right: 10px;width: 100px" @click="showReplyDialog(item)">回复</el-button>
            <el-button type="danger" style="margin-left: 10px;margin-right: 10px;width: 100px" v-show="number === item.studentNumber || role === 'teacher'" @click="deleteDiscussion(item.id)">删除</el-button>
          </div>
        </div>
      </div>

      <!--回复-->
      <div class="box" v-else>
        <div style="background-color: rgb(250,240,230);width: 100px" v-if="item.teacherNumber === '-1' && item.studentNumber !== '-1'">
          <el-avatar shape="square" :size="60" src="src/assets/头像.jpg" class="avatar">Student</el-avatar>
          <p style="text-align: center;margin-top: 5px">{{ item.studentNumber }}</p>
        </div>
        <div style="background-color: rgb(240,255,240);width: 100px" v-if="item.teacherNumber !== '-1' && item.studentNumber === '-1'">
          <el-avatar shape="square" :size="60" src="src/assets/头像.jpg" class="avatar">Teacher</el-avatar>
          <p style="text-align: center;margin-top: 5px">{{ item.teacherNumber }}</p>
        </div>
        <div style="background-color: rgb(245,245,245);width: 100px" v-if="item.teacherNumber === '-1' && item.studentNumber === '-1'">
          <el-avatar shape="square" :size="60" src="src/assets/头像.jpg" class="avatar">已删除</el-avatar>
          <p style="text-align: center;margin-top: 5px">已删除</p>
        </div>
        <div style="margin-left:10px;width: calc(100% - 90px)">
          <div style="margin-top: 5px;margin-right:5px;border-style: ridge;height: 100px" v-if="item.replyTeacherNumber !== null && item.replyStudentNumber === null">
            <p style="margin-left: 10px">回复 <span style="color: cornflowerblue">{{ item.replyTeacherNumber }}</span> :</p>
            <blockquote style="color: #67c23a">{{ item.replyContent }}</blockquote>
          </div>
          <div style="margin-top: 5px;margin-right:5px;border-style: ridge;height: 100px" v-if="item.replyTeacherNumber === null && item.replyStudentNumber !== null">
            <p style="margin-left: 10px">回复 <span style="color: cornflowerblue">{{ item.replyStudentNumber }}</span> :</p>
            <blockquote style="color: #67c23a">{{ item.replyContent }}</blockquote>
          </div>
          <p style="font-size: 18px">{{ item.content }}</p>
          <div style="display: flex;text-align: center">
            <p style="font-size: 14px;color: rgb(67,79,148)">发表于 {{ item.time }}</p>
            <el-button type="primary" style="margin-left: auto;margin-right: 10px;width: 100px" @click="showReplyDialog(item)">回复</el-button>
            <el-button type="danger" style="margin-left: 10px;margin-right: 10px;width: 100px" v-show="number === item.studentNumber || role === 'teacher'" @click="deleteDiscussion(item.id)">删除</el-button>
          </div>
        </div>
      </div>
    </div>

    <hr>
    <!--页码-->
    <el-pagination
        v-model:current-page="getDiscussionData.pageNo"
        v-model:page-size="getDiscussionData.pageSize"
        :total="getDiscussionData.total"
        @current-change="handlePageChange"
        :hide-on-single-page="true"/>

    <!--评论输入框-->
    <div style="padding: 10px">
      <el-input type="textarea" :rows="5" v-model="addDiscussionData.content" placeholder="写下你的评论"></el-input>
      <div style="padding: 10px; display: flex; justify-content: center;">
        <el-button type="success" style="width: 150px;margin-top: 10px;" @click="addDiscussion">发表评论</el-button>
      </div>
    </div>
  </el-card>

  <!--评论弹出框-->
  <el-dialog v-model="replyDialog" title="回复" :before-close="closeDialog">
    <div style="border-style: ridge;height: 100px" v-if="giveReply.studentNumber !== '-1' && giveReply.teacherNumber === '-1'">
      <p style="margin-left: 10px">回复 <span style="color: cornflowerblue">{{ giveReply.studentNumber }}</span> :</p>
      <blockquote style="color: #67c23a">{{ giveReply.content }}</blockquote>
    </div>
    <div style="border-style: ridge;height: 100px" v-if="giveReply.studentNumber === '-1' && giveReply.teacherNumber !== '-1'">
      <p style="margin-left: 10px">回复 <span style="color: cornflowerblue">{{ giveReply.teacherNumber }}</span> :</p>
      <blockquote style="color: #67c23a">{{ giveReply.content }}</blockquote>
    </div>
    <el-input type="textarea" :rows="5" v-model="replyDiscussionData.content" placeholder="写下你的回复内容" style="margin-top: 10px"></el-input>
    <div style="padding: 10px; display: flex; justify-content: center;">
      <el-button type="success" style="width: 150px;margin-top: 10px;" @click="replyDiscussion">进行回复</el-button>
    </div>
  </el-dialog>
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
      // 保存需要被回复的信息
      giveReply: {
        id: null,
        studentNumber: null,
        teacherNumber: null,
        content: null,
        homeworkId: null,
        deleted: null,
        time: null,
        reply: null,
        replyContent: null,
        replyStudentNumber: null,
        replyTeacherNumber: null,
      },
      // 读取讨论区列表
      discussion: [
        {
          id: null,
          studentNumber: null,
          teacherNumber: null,
          content: null,
          homeworkId: null,
          deleted: null,
          time: null,
          reply: null,
          replyContent: null,
          replyStudentNumber: null,
          replyTeacherNumber: null,
        }
      ],
      // 获取信息列表请求
      getDiscussionData: {
        homeworkId: null,
        pageNo: 1,
        pageSize: 5,
        total: null,
      },
      // 发表评论请求
      addDiscussionData: {
        homeworkId: null,
        studentNumber: null,
        teacherNumber: null,
        reply: null,
        content: null,
      },
      // 回复评论请求
      replyDiscussionData: {
        homeworkId: null,
        studentNumber: null,
        teacherNumber: null,
        reply: null,
        content: null,
      },
      replyDialog: false,
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
      this.addDiscussionData.reply = 0;
      if(this.role === 'teacher') {
        this.addDiscussionData.teacherNumber = Cookies.get('number');
        this.addDiscussionData.studentNumber = -1;
        if (this.addDiscussionData.content !== null && this.addDiscussionData.content !== "") {
          api.teaAddDiscussion(this.addDiscussionData).then(res => {
            if (res.data.code === 20000) {
              ElMessage.success("添加成功");
              this.refresh();
            } else {
              ElMessage.error("添加失败");
            }
          })
        } else {
          ElMessage.error("评论不能为空");
        }
      }else {
        this.addDiscussionData.studentNumber = Cookies.get('number');
        this.addDiscussionData.teacherNumber = -1;
        if (this.addDiscussionData.content !== null && this.addDiscussionData.content !== "") {
          api.stuAddDiscussion(this.addDiscussionData).then(res => {
            if (res.data.code === 20000) {
              ElMessage.success("添加成功");
              this.refresh();
            } else {
              ElMessage.error("添加失败");
            }
          })
        } else {
          ElMessage.error("评论不能为空");
        }
      }
    },
    // 回复评论
    replyDiscussion() {
      this.replyDiscussionData.homeworkId = this.homeworkNumber;
      this.replyDiscussionData.reply = this.giveReply.id;
      if (this.role === 'teacher') {
        this.replyDiscussionData.teacherNumber = Cookies.get('number');
        this.replyDiscussionData.studentNumber = -1;
        if (this.replyDiscussionData.content !== null && this.replyDiscussionData.content !== "") {
          api.teaAddDiscussion(this.replyDiscussionData).then(res => {
            if (res.data.code === 20000) {
              ElMessage.success("回复成功");
              this.closeDialog();
              this.refresh();
            } else {
              ElMessage.error("回复失败");
            }
          })
        } else {
          ElMessage.error("回复内容不能为空");
        }
      } else {
        this.replyDiscussionData.studentNumber = Cookies.get('number');
        this.replyDiscussionData.teacherNumber = -1;
        if (this.replyDiscussionData.content !== null && this.replyDiscussionData.content !== "") {
          api.stuAddDiscussion(this.replyDiscussionData).then(res => {
            if (res.data.code === 20000) {
              ElMessage.success("回复成功");
              this.closeDialog();
              this.refresh();
            } else {
              ElMessage.error("回复失败");
            }
          })
        } else {
          ElMessage.error("回复内容不能为空");
        }
      }
    },
    // 删除评论
    deleteDiscussion(id) {
      api.deleteDiscussion(id).then(res => {
        if (res.data.code === 20000) {
          ElMessage.success("删除成功");
          this.refresh();
        } else {
          ElMessage.error("删除失败");
        }
      })
    },
    showReplyDialog(item) {
      this.giveReply = item;
      this.replyDialog = true;
    },
    handlePageChange() {
      this.refresh();
    },
    closeDialog() {
      this.replyDiscussionData.content = null;
      this.replyDialog = false;
    }
  },
  computed:{
    ...mapState(['role','homeworkNumber'])
  }
}
</script>

<style scoped>
.box {
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom-style: ridge;
}

.avatar {
  margin-left: 20px;
  margin-top: 20px;
}
</style>