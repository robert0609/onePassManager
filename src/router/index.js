import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    name: 'home',
    path: '/',
    component: () =>
      import('../pages/home/home.vue')
  }, {
    name: 'list',
    path: '/list',
    component: () =>
      import('../pages/list/list.vue')
  }, {
    name: 'editSite',
    path: '/site/edit',
    component: () =>
      import('../pages/editSite/editSite.vue')
  }, {
    name: 'editAccount',
    path: '/account/edit',
    component: () =>
      import('../pages/editAccount/editAccount.vue')
  }, {
    name: 'error',
    path: '/error',
    component: () =>
      import('../pages/error/error.vue')
  }, {
    name: 'notfound',
    path: '/notfound',
    component: () =>
      import('../pages/notfound/notfound.vue')
  }, {
    name: 'default',
    path: '*',
    component: () =>
      import('../pages/notfound/notfound.vue')
  }
];

export default new Router({
  mode: 'history',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (to.hash) {
        return {
          selector: to.hash
        };
      } else {
        return {
          x: 0,
          y: 0
        };
      }
    }
  }
});
