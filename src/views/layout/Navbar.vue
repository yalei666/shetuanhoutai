<template>
  <div class="">
    <el-menu class="navbar" mode="horizontal" background-color="rgb(238,241,246)" text-color="red">
      <i class="iconfont icon-santiaogang" @click="toggleSideBar" :isActive="sidebar.opened"></i>
      <tabs-view></tabs-view>
      <el-dropdown class="avatar-container" >
        <div class="avatar-wrapper">
          <span class="user-name">{{userInfo.realname}}</span>
          <img class="user-avatar" :src="userInfo.touxiangpath"></img>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/index/personalInfo">
            <el-dropdown-item>首页</el-dropdown-item>  
          </router-link>
          <el-dropdown-item>
            <span @click="diglogFormVisible= true">修改密码</span>
          </el-dropdown-item> 
          <el-dropdown-item divided>
            <span  @click="tuichudenglu()"style="display: block;">退出登录</span>
          </el-dropdown-item>  
        </el-dropdown-menu>  
      </el-dropdown>
    </el-menu> 
    <el-dialog title="密码修改" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="passwordForm" ref="passwordForm" label-position="right" label-width="100px" style='width: 400px;margin-left:50px;'>
        <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" v-model="passwordForm.oldPassword" auto-complete="off"></el-input>  
        </el-form-item>  
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="passwordForm.newPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码" prop="newPassword2">
          <el-input type="password" v-model="passwordForm.newPassword2" auto-complete="off"></el-input>  
        </el-form-item>  
      </el-form> 
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button> 
        <el-button type="primary" @click="handlePwdModifySubmit(passwordForm)">确定</el-button> 
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import TabsView from './TabsView';
  import Cookies from 'js-cookie';
  export default {
    components :{
      TabsView
    },
    data () {
      return {
        dialogVisible:false,
        dialogFormVisible:false,
        passwordForm:{
          "oldPassword":'',
          "newPassword":'',
          "newPassword2":'',
        },
        passwordFormRules:{
          oldPassword:[
            {required:true,trigger:'blur',message:'旧密码不能为空！'},
            {required:true,trigger:'blur',validator:''},
          ],
        },
        isActive:false
      }
    },
    computed:{
      ...mapGetters([
          'sidebar',
          'userInfo'
        ])
    },
    methods:{
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      tuichudenglu(){
        Cookies.remove('userId');
        Cookies.remove('userToken');
        window.location.reload();
      }
    }

  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .navbar{
    height:50px;
    line-height:50px;
    border-radius:0px !important;
    .iconfont{
      cursor:pointer;
      line-height:50px;
      height:50px;
      float:left;
      padding:0 15px;
    }
    .iconfont[isactive]{
      transform:rotate(90deg);
    }
    .hamburger-container{
      line-height:50px;
      height:50px;
      float:left;
      padding:0 10px;
    }
    .errLog-container{
      display:inline-block;
      position:absolute;
      right:150px;
    }
    .avatar-container {
      height:50px;
      display:inline-block;
      position:absolute;
      right:35px;
      .avatar-wrapper{
        cursor:pointer;
        padding:5px;
        position:relative;
        height:40px;
        line-height:40px;
        .user-name{
          float:left;
          margin-right:10px;
        }
        .user-avatar {
          width:40px;
          height:40px;
          border-radius:5px;
        }
        .el-icon-caret-bottom{
          position:absolute;
          right:-20px;
          top:25px;
          font-size:12px;
        }
      }
    }
  }
</style>