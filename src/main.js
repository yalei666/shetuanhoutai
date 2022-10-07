import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';


Vue.config.productionTip = false
Vue.use(ElementUI);

const whiteList = ['/login'];
router.beforeEach((to,from,next) =>{
  NProgress.start();//开启Progress
  if(store.getters.uid) {
    if(to.path === '/login'){
        next({path:'/'});
    } else if(to.path == '/401'){
      next();
    } 
    else if(to.path == '/404'){
      next();
    } else {
      if(!store.getters.userInfo){
        console.log('未获取到用户信息',store.getters.userinfo)
          store.dispatch('GetInfo').then(res =>{
            next();
          }).catch(err =>{
            console.log(err)
          });
      }else{
        console.log(to.path);
        if(store.getters.permission_routers[to.path] == undefined){
          next({path:'/404'});
          NProgress.done();
        }else if(store.getters.permission_routers[to.path] == false){
          next({path:'/401'});
          NProgress.done();
        } 
        else{
          next();
        }
      }
    }
  } else{
    if(whiteList.indexOf(to.path) !==-1){
      console.log(to.path);
      next()
    }else{
      next('/login');
      NProgress.done();
    }
  }
  NProgress.done();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
