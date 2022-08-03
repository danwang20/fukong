import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui'

import "./assets/css/normalize.css";
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import "./assets/css/theme/theme-origin.css";
import "./assets/css/common.css";
import "./assets/css/element-rewrite.css";
import "./assets/css/animate.min.css";
import VueApiExpand from './uitls/expand'

VueApiExpand(Vue)
Vue.use(ElementUI)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
