import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PlantView from '../views/PlantView.vue';
import AdminFeedersView from '../views/admin/AdminFeedersView.vue';
import AdminVarietiesView from '../views/admin/AdminVarietiesView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/plants',
    name: 'Plants',
    component: PlantView,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminView.vue'),
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
