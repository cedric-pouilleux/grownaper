import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import i18n from './i18n/config';
import router from './router';
import App from './App.vue';

createApp(App)
  .use(i18n)
  .use(ElementPlus)
  .use(createPinia())
  .use(router)
  .mount('#app');
