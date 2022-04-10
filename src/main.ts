import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import En from './i18n/messages.en';
import Fr from './i18n/messages.fr';

import App from './App.vue';
import router from './router';

type MessageSchema = typeof En | typeof Fr;

const i18n = createI18n<[MessageSchema], 'en-US' | 'fr-FR'>({
  locale: 'en-US',
  messages: {
    'en-US': En,
    'fr-FR': Fr,
  },
});

createApp(App)
  .use(i18n)
  .use(ElementPlus)
  .use(createPinia())
  .use(router)
  .mount('#app');
