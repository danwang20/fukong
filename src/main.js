import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui'
import axios from 'axios'

import "./assets/css/normalize.css";
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import "./assets/css/theme/theme-origin.css";
import "./assets/css/common.css";
import "./assets/css/element-rewrite.css";
import "./assets/css/animate.min.css";
import VueApiExpand from './uitls/expand'

VueApiExpand(Vue)
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false;

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ?
        o[k] :
        ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};
/*
 * 重写时间的toJSON方法，因为在调用JSON.stringify的时候，时间转换就调用的toJSON，这样会导致少8个小时，所以重写它的toJSON方法
 */
Date.prototype.toJSON = function () {
  return this.format("yyyy-MM-dd hh:mm:ss"); // util.formatDate是自定义的个时间格式化函数
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");