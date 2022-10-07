const getters = {
  uid:state => state.user.uid,
  // token:state => state.user.token,
   userInfo: state =>state.user.userInfo,
   sidebar:state =>state.app.sidebar,
   visitedViews:state =>state.app.visitedViews,
   
   permission_routers : state =>{return state.permission.routers},
   cebianjiegou       : state =>{return state.app.cebianjiegou},
  // addRouters: state => state.permission.addRouters
};
export default getters