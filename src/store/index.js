import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tableIsClick: false,
    isHidden: false,
    test: '123',
  },
  mutations: {
    changeTableIsClick(state,params) {
      state.tableIsClick = params
    },
    changeIsHidden(state,params) {
      state.isHidden = params
    },
    testMethods(state,params) {
      state.test = params
    }
  },
  actions: {},
  modules: {},
});
