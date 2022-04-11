import enUS from '@/i18n/messages.en';
import frFR from '@/i18n/messages.fr';

import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'en-US',

  missingWarn: false,
  globalInjection: true,
  fallbackWarn: false,
  messages: {
    'en-US': enUS,
    'fr-FR': frFR,
  },
  datetimeFormats: {
    'en-US': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
    'fr-FR': {
      short: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      },
    },
  },
});

export default i18n;
