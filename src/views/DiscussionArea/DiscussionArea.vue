<template>
  <el-card style="height: 100%">
    <template #header>
      <!--页头-->
      <page-header :component='head'/>
    </template>
    <!--评论输入框-->
    <div style="display: flex;text-align: center;width: 100%">
      <el-card style="width: 100%;background-color: rgb(230,230,250)">
        <el-input type="textarea" :rows="5" v-model="content" placeholder="写下你的评论"></el-input>
        <el-button type="success" style="width: 150px;margin-top: 10px">发表评论</el-button>
      </el-card>
    </div>
    <!--评论查看-->
    <div class="common-layout" v-for="item in discussion">
      <!--      <el-card style="background-color: rgb(240,248,255)">-->
      <el-container>
        <el-card style="background-color: rgb(176,224,230)">
          <el-aside width="100px">
            <el-avatar :size="100" src="src/assets/头像.jpg" class="avatar"></el-avatar>
            <p style="text-align: center;margin-top: 5px">{{ item.number }}</p>
          </el-aside>
        </el-card>
        <el-container>
          <el-card style="margin-left: 1px;width: 100%;background-color: rgb(173,216,230)">
            <!--非回复-->
            <div v-if="item.reply === null" style="width: 100%">
              <el-main>
                <el-input type="textarea" :rows="4" v-model="item.content" readonly></el-input>
                <div style="display: flex;text-align: center">
                  <p style="font-size: 12px">发表于 2023-11-20 15:34</p>
                  <el-button link type="primary" style="margin-left: auto">回复</el-button>
                  <el-button link type="primary" style="margin-left: 10px" v-show="number === item.number">删除</el-button>
                </div>
              </el-main>
            </div>
            <!--回复-->
            <div v-else style="width: 100%">
              <el-header height="100px">
                <el-card style="height: 100px">
                  <p>回复 <span style="color: cornflowerblue">{{ item.reply }}</span> :</p>
                  <blockquote>hello</blockquote>
                </el-card>
              </el-header>
              <el-main>
                <el-input type="textarea" :rows="3" v-model="item.content" readonly></el-input>
                <div style="display: flex;text-align: center">
                  <p style="font-size: 12px">发表于 2023-11-20 15:34</p>
                  <el-button link type="primary" style="margin-left: auto">回复</el-button>
                  <el-button link type="primary" style="margin-left: 10px" v-show="number === item.number">删除</el-button>
                </div>
              </el-main>
            </div>
          </el-card>
        </el-container>
      </el-container>
      <hr>
      <!--      </el-card>-->
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
      discussion: [
        {
          number: "21271108",
          content: "不想写前端啦",
          reply: null,
        },
        {
          number: "21301105",
          content: "撒币王迅给我写前端",
          reply: "21271108"
        },
        {
          number: "21301105",
          content: "撒币王迅给我写前端",
          reply: "21271108"
        }
      ]
    }
  }
}
</script>

<style scoped>
.common-layout {
  border: #181818;
  margin-top: 1px;
}
.avatar {
//margin-left: 10px;
  margin-top: 20px;
}
</style>