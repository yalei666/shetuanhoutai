<template>
  <div class="li">
      <div v-for="item in cebianjiegou" :key="item.label">
        <div v-if="item.authority">
          <div v-if="item.children">
            <el-submenu :index="item.label">
              <template slot="title">
                <i :class="item.fontClass" aria-hidden="true"></i>{{item.label}}
              </template>
              <router-link class="menu-indent" v-for="ziluyou in item.children" :key="ziluyou.label" :to="{path:ziluyou.path}" v-if="ziluyou.authority">
                <el-menu-item :index="ziluyou.path">
                  {{ziluyou.label}}
                </el-menu-item>
              </router-link>                     
            </el-submenu>                   
          </div>        
          <div v-else>
            <router-link :to="item.path">
              <el-menu-item :index="item.path">
                <i :class="item.fontClass" aria-hidden="true"></i>{{item.label}}
              </el-menu-item>
            </router-link>          
          </div>          
        </div>
      </div>    
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default{
    name:'SidebarItem',
    data () {
      return {
        
      }
    },
    computed:{
      ...mapGetters([
        'cebianjiegou'
      ])          
    }
  };
</script>
<style>
.li{width:180px;}
.iconfont{margin-right: 10px; font-color:#bfcbd9;}
</style>