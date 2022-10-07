import Cookies from 'js-cookie';

const app = {
  state: {
    sidebar:{
      opened:'!+Cookies.get(sidebarStatus)'
    },
    // theme:'default',
    // livenewsChannels : '',
    visitedViews:[],
    cebianjiegou:''
  },
  mutations : {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus',1);
      } else {
        Cookies.set('sidebarStatus',0);
      }
      state.sidebar.opened=!state.sidebar.opened;
    },
    ADD_VISITED_VIEWS: (state,view) =>{
      if (state.visitedViews.includes(view)) return
      state.visitedViews.push(view)
    },
    DEL_VISITED_VIEWS:(state,view) =>{
      const index = state.visitedViews.indexOf(view)
      state.visitedViews.splice(index,1)
    },
    SET_CEBIANJIEGOU:(state,jiegou)=>{
      state.cebianjiegou = jiegou;
    }
  },
  actions: {
    ToggleSideBar: ({commit}) => {
      commit('TOGGLE_SIDEBAR')
    },
    addVisitedViews: ({commit},view) => {
      commit('ADD_VISITED_VIEWS',view)
    },
    delVistedViews: ({commit},view) => {
      commit('DEL_VISITED_VIEWS',view)
    },
    SetCebianjiegou:({commit},jiegou)=>{
      commit('SET_CEBIANJIEGOU',jiegou)
    }
  }
}
export default app;