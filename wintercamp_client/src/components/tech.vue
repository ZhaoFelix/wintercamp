<template lang="html">
  <div class="container">
    <div class="top">
      <ul>
        <li>技术：{{name}}</li>
        <li>学校：{{school}}</li>
        <li>队伍：待定</li>
      </ul>
    </div>
    <div class="center">
      <el-card class="box-card" v-for=" (que,index) in question" :key="que.question">
        <div slot="header" class="clearfix">
          <span>{{ que.question }}</span>
        </div>
       <div v-for="(ans,i) in que.answer" >
          <el-radio-group v-model="que.radio" @change="selected(index)">
            <el-radio v-model="que.radio" :label="ans"  :key="ans" >{{ ans }}</el-radio>
         </el-radio-group>
      </div>
</el-card>
    </div>
    <div class="bottom">
      <el-button type="warning" @click="getCode" style="width:50%">提交</el-button>
    </div>

    <el-dialog title="提交失败" :visible.sync="dialogvisible">
      <span>请先完成所有题目！</span>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";

const questionList = [
    {
      question:"Ui设计是什么意思？",
      answer:["A. User Interface的缩写，是指用户界面设计","B. User Identity的缩写，是指用户识别设计","C. User Ideal的缩写，是指用户目标设计","D. User Ideal的缩写，是指用户目标设计"],
      id:1,
      radio:"radio1",
    },
    {
      question:"网页设计中的网页界面栅格化是指？",
      answer:["A. 使用ps设计网页界面过程中，将所有的层都格式化图层","B. 在页面制作时，将所有的层宽度统一","C. 在网页界面设计中，运用固定的格子设计版面布局，使页面风格工整简洁","D. 网页设计中，使用背景是格子样式的背景图案"],
      id:2,
      radio:"radio2"
    }
]
var index = 0;
var resultArr = [];
var tag  = 0;
export default {
  name:"tech",
  data(){
    return{
      radio:'',
      question:questionList,
      name:'',
      school:'',
      id:'',
      dialogvisible:false
    };
  },
  methods:{
    getCode(){
     if(resultArr.length < 2){
       this.dialogvisible = true;
     }
     else {
       //发送请求更新状态
       var _this = this;
       this.$axios.post('/api/answer',qs.stringify({
         id:_this.id
       }),{
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Access-Control-Allow-Origin':'*'
           }
       })
       .then(function(response){
         var re = response.data;
         if(re.code==1){
             _this.$router.push({path:`/code/${_this.name}/${_this.school}`});
         }
         else {

         }

       })
       .catch(function(error){
         console.log(error);
       })


     }
    },
    selected(i){
      var flag = resultArr.indexOf(i);
      if(flag==-1){
        resultArr.push(i)
      }
      else {

      }
    }
  },
  created:function(){
    //获取链接中的参数
    this.name = this.$route.params.name;
    this.school = this.$route.params.school;
    this.id = this.$route.params.id;
  },
  computed:{
     curadio:function(){
       return this.radio+index+1;
     }
  },
}
</script>

<style lang="css">
body{
  position: relative;
  height: 100%;
  margin: 0;
}
.container{
  margin-top: -16px;
}
.top {
  background-color: white;
}
.top li {
  text-align: left;
  list-style-type: none;
}
.my-question{

}
.center {
  text-align: left;
  margin: 4px;
}
.bottom {
  margin-top: 10px;
  margin-bottom: 10px;
}
.box-card {
  margin-bottom: 4px;
}
</style>
