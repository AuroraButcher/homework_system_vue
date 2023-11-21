<template>
  <ul class="border">
    <li v-for="(item, index) in data" :key="index">
      <div class="message-item" >
        <div v-if="item.isRead===0" class="dot"></div>
        <div v-if="item.isRead===1" class="dot" style="background-color: white;"></div>
        <el-icon style="font-size: 16px; margin-right: 10px;"><Message /></el-icon>
        <el-link style="font-size: 16px">{{ item.title }}</el-link>
        <div class="date">{{ item.date }}</div>
      </div>
      <el-divider/>
    </li>
  </ul>
</template>

<script>
import {Message} from "@element-plus/icons-vue";
import {mapState} from "vuex";
import Cookie from "js-cookie";
import api from "../../api";
import {ElMessage} from "element-plus";

export default {
  name: "MessageCard",
  components: {Message},
  data(){
    return{
      data:[{
        isRead:0,
        title:"作业提醒",
        time: "2023-11-21 17;08"
      }],
      page:{
        studentNumber:Cookie.get('number'),
        pageNo:1,
        pageSize:10,
      },
      defaultProps:{
        children: 'children',
        label: 'label',
      }
    }
  },
  created() {
    if(this.role==='student'){
      api.getStuMessage(this.page).then(res=>{
        if(res.data.code===20000){

        }else {
          ElMessage.error('加载失败')
        }
      })
    }
  },
  methods:{
  },
  computed:{
    ...mapState(['role'])
  }
}
</script>

<style scoped>
.message-item {
  display: flex;
  align-items: center;
}

.dot {
  width: 6px;
  height: 6px;
  background-color: red;
  border-radius: 50%;
  margin-right: 10px;
}

.date {
  font-size: 12px;
  margin-left: auto;
}

.border{
  list-style: none;
  border: 1px solid white;
  padding: 0;
}
</style>