<template>
  <div class="login-wrap">
    <div class="ms-login" style="width:350px;">
      <div class="ms-title">社团管理系统后台</div>
      <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="email">
          <el-input name="account" type="text" v-model="ruleForm.xuehao" autocomplete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item  prop="pass">
          <el-input name="password" type="password" v-model="ruleForm.password" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>
          <div class="login-btn">
            <el-button type="primary"  @click="submitForm">登录</el-button>
            <el-button >忘记密码</el-button>            
          </div>
        </el-form-item>
      </el-form>
    </div>   
  </div>
</template>
<script>
  // import {global} from '../../global/global.js'
  export default {
    data() {
      return {
        fileList:[],
        formLabelWidth:'120px',
        loading:false,
        ruleForm: {
          xuehao:'',
          password: '',
        },
        dialogVisible:false,
        params:"",
      };
    },
    methods: {
      submitForm(){
        let vm = this;
        vm.$store.dispatch('LoginByEmail',vm.ruleForm).then((res)=>{
          console.log('登录成功即将跳转。。。。。。')
          vm.$router.push({path:'/'});
        })   
      },
    }
  };
</script>
<style  >
.login-wrap .el-form{
  width:300px !important;
}
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../../assets/img/login-bg.jpg) no-repeat center center;
    background-size: 100% 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px !important;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}   
</style>