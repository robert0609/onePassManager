import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NotFound from '@/pages/notFound';
import ErrorPage from '@/pages/error';
import { isClientLogin } from '@/core/business/login';

const routes: RouteRecordRaw[] = [
  {
    name: 'home', // 首页
    path: '/:pathMatch(home)?',
    component: () => import('@/pages/home')
  },
  {
    name: 'login',
    path: '/unlock',
    component: () => import('@/pages/login')
  },
  {
    name: 'siteList',
    path: '/site/list',
    component: () => import('@/pages/site/list')
  },
  {
    name: 'siteEdit',
    path: '/site/edit',
    component: () => import('@/pages/site/edit')
  },
  {
    name: 'accountList',
    path: '/account/list',
    component: () => import('@/pages/account/list')
  },
  {
    name: 'accountEdit',
    path: '/account/edit',
    component: () => import('@/pages/account/edit')
  },
  {
    name: 'restore',
    path: '/manage',
    component: () => import('@/pages/restore')
  },
  {
    name: 'error', // 错误页面
    path: '/error',
    component: ErrorPage
  },
  {
    name: 'notFound',
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login') {
    if (!isClientLogin()) {
      next({
        name: 'login',
        query: {
          ['src_url']: to.fullPath
        },
        replace: true
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
