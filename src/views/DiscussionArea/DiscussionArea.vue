<template>
  <el-card style="height: 100%">
    <template #header>
      <!--页头-->
      <page-header :component='head'/>
    </template>
    <!--评论输入框-->
    <div style="display: flex;text-align: center">
      <el-input type="textarea" :rows="3" v-model="content" placeholder="写下你的评论"></el-input>
      <el-button type="primary" style="width: 150px;margin-left: 10px">发表评论</el-button>
    </div>
    <hr>
    <!--评论查看-->
    <div class="common-layout" v-for="item in discussion">
      <div v-if="item.reply === null">
        <el-container>
          <el-aside width="80px">
            <el-avatar :size="60" src="src/assets/头像.jpg" class="avatar"></el-avatar>
            <p style="text-align: center;margin-top: 5px">{{ item.number }}</p>
          </el-aside>
          <el-container>
            <el-main>
              <el-input type="textarea" :rows="3" v-model="item.content" readonly></el-input>
              <div style="display: flex;text-align: center">
                <p style="font-size: 12px">发表于 2023-11-20 15:34</p>
                <el-button link type="primary" style="margin-left: auto">回复</el-button>
                <el-button link type="primary" style="margin-left: 10px" v-show="number === item.number">删除</el-button>
              </div>
            </el-main>
          </el-container>
        </el-container>
      </div>
      <div v-else>
        <el-container>
          <el-aside width="80px">
            <el-avatar :size="60" src="src/assets/头像.jpg" class="avatar"></el-avatar>
            <p style="text-align: center;margin-top: 5px">{{ item.number }}</p>
          </el-aside>
          <el-container>
            <el-header height="20px">
              <p>回复 <span style="color: cornflowerblue">{{ item.reply}}</span> :</p>
            </el-header>
            <el-main>
              <el-input type="textarea" :rows="2" v-model="item.content" readonly></el-input>
              <div style="display: flex;text-align: center">
                <p style="font-size: 12px">发表于 2023-11-20 15:34</p>
                <el-button link type="primary" style="margin-left: auto">回复</el-button>
                <el-button link type="primary" style="margin-left: 10px" v-show="number === item.number">删除</el-button>
              </div>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </div>
  </el-card>
</template>

<script>
import PageHeader from "../Base/PageHeader.vue";
import Cookies from "js-cookie";

export default {
  methods: {Cookies},
  components: {PageHeader},
  data(){
    return {
      head: "讨论区",
      number: Cookies.get('number'),
      content: "",
      discussion:[
        {
          number:"21271108",
          content:"不想写前端啦",
          reply:null,
        },
        {
          number:"21301105",
          content:"撒币王迅给我写前端",
          reply:"21271108"
        }
      ]
    }
  }
}
</script>

<style scoped>
.common-layout {
  border: #181818;
}
.avatar {
  margin-left: 10px;
  margin-top: 20px;
}
</style>