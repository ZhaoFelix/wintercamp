<template lang="html">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <ul>
        <li>技术：{{name}}</li>
        <li>学校：{{school}}</li>
        <li>队伍：{{group}}</li>
      </ul>
    </div>
    <div  class="text item">
      <img :src="imgUrl">
    </div>
  </el-card>
</template>

<script>
import qs from 'qs';
const groupA = ["第一组","第二组","第三组","第四组","第五组","第六组","第七组",
                "第八组","第九组","第十组","第十一组","第十二组","第十三组",
                "第十四组","第十五组","第十六组"]
export default {
  name:"code",
  data() {
    return {
      currentDate: new Date(),
      name:'',
      school:'',
      group:"待定",
      imgUrl:require("../assets/default.png")
    };
  },
  created:function(){
    //获取链接中的参数
    this.name = this.$route.params.name;
    this.school = this.$route.params.school;
    var _this = this;
    this.$axios.post('/api/login',qs.stringify({
      name:this.name
    }),{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin':'*'
        }
    })
    .then(function(response){
        var res = response.data;
        if(res.code==1){
           const obj = res.result[0];
           _this.group = groupA[obj.group-1];
           _this.imgUrl = require(`../assets/${obj.group}.png`)
        }
        else {
          console.log("获取信息失败");
        }
    })
    .catch(function(error){
      console.log(error);
    })
  }

}
</script>

<style lang="css">
body {

}
.clearfix li {
  text-align: left;
  list-style-type: none;
}
.clearfix{
  background-color: white;
opacity: 0.9;
}
.box-card{
  background-image: url("../assets/bg.png");
}
.text img {
  width: 80%;
}
</style>
