/**
* 主模块文件
*/
import 'babel-polyfill';
import Vue from 'vue';
import router from './router';
import './validate';
import app from './app.vue';
import vpcui from 'v-pc-ui';
import 'v-pc-ui/dist/vpcui.min.css';
import { browser } from 'v-utility';

Vue.use(vpcui);

Vue.config.productionTip = false;
/* eslint-disable no-undef */
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function (err) {
    router.push({
      name: 'error',
      query: {
        error: err.message
      }
    });
  };
}


//扩展路由的跳转接口
router.load = function (url, { replace = false } = {}) {
  let { sameDomain, path } = browser.location.analyze(url);
  if (sameDomain) {
    if (replace) {
      router.replace({ path: path });
    }
    else {
      router.push({ path: path });
    }
  }
  else {
    if (replace) {
      location.replace(url);
    }
    else {
      location.href = url;
    }
  }
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<app/>',
  components: { app }
});
