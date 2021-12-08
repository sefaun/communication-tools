import Vue from 'vue'
import VueI18N from 'vue-i18n'

import en from './lang/en.json'
import tr from './lang/tr.json'

Vue.use(VueI18N);

export default new VueI18N({
  locale: localStorage.getItem('lang') || 'en',
  messages: {
    en,
    tr
  }
})