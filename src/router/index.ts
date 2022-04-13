import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PlantView from '../views/PlantView.vue';
import AdminFeedersView from '../views/admin/AdminFeedersView.vue';
import AdminVarietiesView from '../views/admin/AdminVarietiesView.vue';
import AccountView from '../views/AccountView.vue';

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
  {
    path: '/account',
    name: 'Account',
    component: AccountView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  /*
   * const user = UserStore();
   */
  next();
});

export default router;
