import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tableIsClick: false,
    isHidden: false
  },
  mutations: {
    changeTableIsClick(state,params) {
      state.tableIsClick = params
    },
    changeIsHidden(state,params) {
      state.isHidden = params
    }
  },
  actions: {},
  modules: {},
});
