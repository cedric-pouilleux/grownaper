import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Plants',
    component: HomeView,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue'),
  },

  {
    path: '/admin/varieties',
    name: 'AdminVarieties',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminVarietiesView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
