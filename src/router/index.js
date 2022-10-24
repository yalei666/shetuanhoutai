import Vue from 'vue'
import VueRouter from 'vue-router'
import Login  from '../views/login/login.vue'
import shouye from '../views/index/shouye.vue'
import Layout from '../views/layout/Layout.vue'
import shetuanliebiao from '../components/shetuanliebiao/shetuanliebiao.vue'
import shettuansectioninfo from '../components/shettuansectioninfo/shettuansectioninfo.vue'
import handleshetuanjoin   from '../components/handleshetuanjoin/handleshetuanjoin.vue'
import handlepartyrenyuan   from '../components/handlepartyrenyuan/handlepartyrenyuan.vue'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path:'/',
    redirect:'/index/shouye'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/index',
    component:Layout,
    redirect:'noredirect',
    name:'首页',
    children:[
      {path:'shouye',component:shouye,name:'浏览首页'}
    ]
  },
  {
    path:'/shetuan',
    component:Layout,
    redirect:'noredirect',
    name:'社团管理',
    children:[
      {path:'partyList',component:shetuanliebiao,name:'社团基本信息'},
      {path:'sectioninfo',component:shettuansectioninfo,name:'社团部门结构'}
    ]    
  },
  {
    path:'/applyjoin',
    component:Layout,
    redirect:'noredirect',
    name:'社团管理',
    children:[
      {path:'handleshetuanjoin',component:handleshetuanjoin,name:'入社申请管理'},
    ]    
  },
  {
    path:'/mangeall',
    component:Layout,
    redirect:'noredirect',
    name:'社团管理',
    children:[
      {path:'partymangerenyuan',component:handlepartyrenyuan,name:'本社人员管理'},
    ]    
  },  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
