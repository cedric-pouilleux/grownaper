import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import App from './App.vue';
import 'element-plus/dist/index.css';
import i18n from './i18n/config';
import router from './router';

createApp(App)
  .use(i18n)
  .use(ElementPlus)
  .use(createPinia())
  .use(router)
  .mount('#app');
