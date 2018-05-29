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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<app/>',
  components: { app }
});
