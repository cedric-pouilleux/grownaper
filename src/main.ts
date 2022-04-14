import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import CountryFlagNext from 'vue-country-flag-next';
import Interceptors from '@/api/Interceptors';
import App from './App.vue';
import 'element-plus/dist/index.css';
import i18n from './i18n/config';
import router from './router';
import UserStore from './store/users';

Interceptors(UserStore);

createApp(App)
  .use(i18n)
  .use(ElementPlus)
  .use(createPinia())
  .use(router)
  .use(CountryFlagNext)
  .mount('#app');
