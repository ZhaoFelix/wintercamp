<template lang="html">
  <div class="">
    <img src="../assets/logo.png" class="logo">
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="60px" class="demo-ruleForm my-form" label-position="left" >
    <el-form-item label="用户名:" prop="username" >
      <el-input type="text" v-model="ruleForm2.username" autocomplete="off" placeholder="请输入您的用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码:" prop="pass">
      <el-input v-model="ruleForm2.pass" type="password" placeholder="请输入您的密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="warning" @click="submitForm('ruleForm2')" class="my-btn">登录</el-button>
    </el-form-item>
  </el-form>
 <el-dialog title="登录失败" :visible.sync="dialogvisible">
   <span>请确认您的用户名或密码均输入正确！</span>
 </el-dialog>

 <el-dialog title="请选择您的角色" :visible.sync="successvisible" class="my-dialog" style="margin-top:100px">
   <div class="left" @click="tech" >
     <img src="../assets/tech.png" alt="">
   </div>
   <div class="right" @click="design">
      <img src="../assets/design.png" />
   </div>
 </el-dialog>
</div>

</template>

<script>
import qs from 'qs';

export default {
  name:"login",
  data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码'));
        }
        else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          username: '',
          pass: '',
          obj:''
        },
        rules2: {
          username: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: checkAge, trigger: 'blur' }
          ]
        },
        dialogvisible:false,
        successvisible:false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const pass = this.ruleForm2.pass;
            var _this = this;
            this.$axios.post('/api/login',qs.stringify({
              name:this.ruleForm2.username
            }),{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin':'*'
                }
            })
            .then(function(response){
              var re = response.data;

              if(re.code==1 && pass=="111111"){
                _this.obj = re.result[0];
                if(re.result[0].isAns=="0"){
                    _this.successvisible = true;
                }
                else {
                  _this.$router.push({path:`/code/${_this.obj.name}/${_this.obj.school}`});
                }
              }
              else {
                _this.dialogvisible = true;
              }

            })
            .catch(function(error){
              console.log(error);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      tech(){
        if(this.obj.isAns=="1"){
            this.$router.push({path:`/code/${this.obj.name}/${this.obj.school}`});
        }
        else {
          this.$router.push({path:`/tech/${this.obj.name}/${this.obj.school}/${this.obj._id}`});
        }

      },
      design(){
        if(this.obj.isAns=="1"){
            this.$router.push({path:`/code/${this.obj.name}/${this.obj.school}`});
        }
        else {
          this.$router.push({path:`/design/${this.obj.name}/${this.obj.school}/${this.obj._id}`});
        }

      }
    }
}
</script>

<style lang="css">
.my-form {
  margin-left:5%;
  padding-right: 5%;
  color: white;
}
.my-btn{
  width: 50%;
}
.left {
  /* background-color: red; */
  position: relative;
  float: left;
  width: 59%;
  height: 180px;
  margin-left: -20px;
  margin-top: -24px;
}
.left img {
  width: 100%;
}

.right{
  /* background-color: blue; */
  position: relative;
  float: right;
  width: 58%;
  height: 180px;
  margin-right: -20px;
  margin-top: -24px;
}
.right img {
  width: 100%;
}
.el-dialog {
  width: 70%;
  height: 240px;
}
.logo {
  width: 30%;
  margin-top: 90px;
}
.el-form-item__label {
  color: white;
  font-weight: bold;
}
</style>
