import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminFeedersView from '../views/AdminFeedersView.vue';
import AdminVarietiesView from '../views/AdminVarietiesView.vue';

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
    component: AdminVarietiesView,
  },
  {
    path: '/admin/feeders',
    name: 'AdminFeeders',
    component: AdminFeedersView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
