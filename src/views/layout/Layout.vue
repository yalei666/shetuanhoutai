<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="sidebar-wrapper">
      <Sidebar class="sidebar-container" />
    </div>
    <div class="main-container">
      <Navbar/>
      <AppMain/>
    </div>
  </div>
</template>
<script>
  import {Navbar,Sidebar,AppMain} from './';
  export default {
    name:'HelloWorld',
    components: {
      Navbar,
      Sidebar,
      AppMain,
    },
    computed:{
      sidebar() {
        return this.$store.state.app.sidebar;
      }
    },

  };
</script>
<style lang="scss">
  .app-wrapper{
    height: 100%;
    width:100%;
    position:relative;
    &.hideSidebar{
      .sidebar-wrapper{
        transform:translate(-140px,0);
         .sidebar-container{
          transform:translate(132px,0);
         }
         &:hover {
          transform:translate(0,0);
           .sidebar-container{
            transform:translate(0,0);
           }
         }
      }
      .main-container {
        margin-left:40px;
      }
    }
  }
  .sidebar-wrapper {
    width:180px;
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    z-index:10001;
    overflow: hidden;
    transition: all .28s ease-out;

  }
  .sidebar-container {
    transition: all .28s ease-out;
    position: absolute !important;
    top:0;
    bottom:0;
    left:0;
    right:-17px;
    overflow-y: scroll;
  }
  .main-container {
    transition:all .28s ease-out;
    margin-left:180px;
    margin-top: 0px;
  }
</style>