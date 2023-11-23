<template>
  <el-dialog v-model="dialog" :title=title @close="close">
    <p>{{content}}</p>
  </el-dialog>
  <span v-show="data.length===0">无</span>
  <ul class="border">
    <li v-for="(item, index) in filteredData" :key="index">
      <div class="message-item" >
        <div v-if="item.isRead===0" class="dot"></div>
        <div v-if="item.isRead===1" class="dot" style="background-color: white;"></div>
        <el-icon style="font-size: 16px; margin-right: 10px;"><Message /></el-icon>
        <el-link style="font-size: 16px" @click="open(item.id)">{{ item.title }}</el-link>
        <div class="date">{{ item.date }}</div>
      </div>
      <el-divider/>
    </li>
  </ul>
  <!--页码-->
  <el-pagination
      v-model:current-page="page.pageNo"
      v-model:page-size="page.pageSize"
      :total="page.total"
      @current-change="handlePageChange"
      :hide-on-single-page="false"/>
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
  props:{
    condition:1,
  },
  data(){
    return{
      dialog:false,
      title:'',
      content:'',
      data:[],
      page:{
        studentNumber:Cookie.get('number'),
        pageNo:1,
        pageSize:7,
        total:1,
      },
      defaultProps:{
        children: 'children',
        label: 'label',
      }
    }
  },
  created() {
    this.handlePageChange()
  },
  methods:{
    open(id){
      //console.log(id)
      this.dialog = true;
      api.getReminderDetail(id).then(res=>{
        if(res.data.code===20000){
          this.title=res.data.data.info.title
          this.content=res.data.data.info.content
        }else {
          ElMessage.error('获取失败')
        }
      })
    },
    getData(){
      if(this.condition===0){
        api.unReadRemind(this.page).then(res=>{
          if(res.data.code===20000){
            this.data=res.data.data.list.records
            this.page.total=res.data.data.list.total
          }else {
            ElMessage.error('加载失败')
          }
        })
      }else if(this.condition===1){
        api.isReadRemind(this.page).then(res=>{
          if(res.data.code===20000){
            this.data=res.data.data.list.records
            this.page.total=res.data.data.list.total
          }else {
            ElMessage.error('加载失败')
          }
        })
      }else {
        api.getStuMessage(this.page).then(res=>{
          if(res.data.code===20000){
            this.data=res.data.data.list.records
            this.page.total=res.data.data.list.total
          }else {
            ElMessage.error('加载失败')
          }
        })
      }
    },
    close(){
      if(this.role==='student'){
        this.getData()
      }
    },
    handlePageChange(){
      if(this.role==='student'){
        this.getData()
      }
    },
  },
  computed:{
    ...mapState(['role']),
    filteredData() {
      if (this.condition === 0) {
        return this.data.filter(item => item.isRead === 0);//未读 0
      } else if (this.condition === 1) {
        return this.data.filter(item => item.isRead === 1);//已读 1
      } else {//全部 2
        return this.data;
      }
    },
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