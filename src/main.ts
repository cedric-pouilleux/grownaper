import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import CountryFlagNext from 'vue-country-flag-next';
import Interceptors from '@/api/Interceptors';
import FloatingVue from 'floating-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  fas, faAmbulance, faUser, faSeedling,
} from '@fortawesome/free-solid-svg-icons';
import { fab, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import 'element-plus/dist/index.css';
import i18n from './i18n/config';
import router from './router';
import UserStore from './store/users';

library.add(fas, fab, faGoogle, faAmbulance, faUser, faSeedling);
Interceptors(UserStore);

createApp(App)
  .use(i18n)
  .use(FloatingVue)
  .use(ElementPlus)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(createPinia())
  .use(router)
  .use(CountryFlagNext)
  .mount('#app');
