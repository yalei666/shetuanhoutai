import Cookies from 'js-cookie';
import axios from 'axios';
import {global} from '@/global/global';
import {Message} from 'element-ui';
import {api} from '../../global/api';
const user = {
  state:{
    uid: Cookies.get('userId'),
    //token:Cookies.get('userToken'),
    userInfo:null,
  },
  mutations: {
    SET_UID:(state,uid)=>{
      state.uid=uid;
    },
    // SET_TOKEN:(state,token)=>{
    //   state.token = token;
    // },
    SET_USERINFO:(state,userInfo) =>{
      state.userInfo=userInfo;
    },
    LOGIN_SUCCES:()=>{
      console.log('login success')
    }
  },
 actions: {
    //邮箱登录
    LoginByEmail({commit},userInfo){
      return new Promise((resolve,reject)=>{
        console.log('登录入参',userInfo)
        global.post(api.login,userInfo,function(res){
          console.log('......获取登录返回信息:',res.data)
          if(res.data.resultCode == 1){
            var res=res.data.data.results[0];
            //Cookies.set('userToken',res.token,{expires:1/3});
            Cookies.set('userId',res.id,{expires:1/3});
            //设置token
            //commit('SET_TOKEN',res.token);
            //设置uid
            commit('SET_UID',res.id);
            resolve();
          }else{
            Message({
              showClose:true,
              message: res.body.resultMsg,
              type:'error'
            });
          }
        },function(res){
        })
        return false;
      });
    },
    // 获取用户信息
    GetInfo({ dispatch,commit, state }) {
        return new Promise((resolve, reject) => {
            global.get( api.getUserInfo,{'userId':state.uid,qianduan:false}, function(res){
                  console.log('-------根据id获取用户信息：',JSON.stringify(res) )
                  if(res.data.resultCode == 1){
                       var resdata = res.data.data;
                             //设置userInfo
                             commit('SET_USERINFO', resdata.results[0]);
                             //获取到信息时同时设置用户菜单权限
                             // store.dispatch('GenerateRoutes', res.permissions); 等同于
                             dispatch('GenerateRoutes', resdata.permissions);
                             dispatch('SetCebianjiegou', resdata.qianduanjiegou);
                             resolve();
                  }else{
                        //alert(res.body.resultMsg)
                        Message({
                            showClose: true,
                            message: res.data.resultMsg,
                            type: 'error'
                        });
                  }
            },function(res){
                reject(res);
            })
        });
    },

    

    // // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code);
    //     loginByThirdparty(state.status, state.email, state.code, state.auth_type).then(response => {
    //       commit('SET_TOKEN', response.data.token);
    //       Cookies.set('userToken', response.data.token);
    //       resolve();
    //     }).catch(error => {
    //       reject(error);
    //     });
    //   });
    // },


    // // 登出 （头部登出）
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     //换成请求登出接口

    //     // logout(state.token).then(() => {  
    //       commit('SET_TOKEN', '');
    //       // commit('SET_ROLES', []);
    //       Cookies.remove('userToken');
    //       Cookies.remove('userId');
    //       resolve();
    //     // }).catch(error => {
    //     //   reject(error);
    //     // });
    //   });
    // },


    // // 动态修改权限
    // ChangeRole({ commit }, role) {
    //   return new Promise(resolve => {
    //     // commit('SET_ROLES', [role]);
    //    //store.dispatch('GenerateRoutes', res.permissions);
    //     dispatch('GenerateRoutes', res.permissions);
    //     resolve();
    //   })
    // }
  }
};


export default user;