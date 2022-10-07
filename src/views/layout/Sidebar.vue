<template>
  <el-menu 
  	background-color="#324157" 	
  	text-color="#bfcbd9" 
  	active-text-color="#20a0ff"
    :default-active="$route.path"
  	>
    <sidebar-item></sidebar-item>
  </el-menu>
</template>
<script>
  import SidebarItem from './Sidebaritem';
  export default {
    components:{SidebarItem},

  };
</script>
<style lang="scss" scoped>

</style>