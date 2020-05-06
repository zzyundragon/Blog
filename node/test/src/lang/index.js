import Vue from 'vue'
import store from '@/store'
import VueI18n from 'vue-i18n'

import zh from '@/lang/zh'
import en from '@/lang/en'

Vue.use(VueI18n)
const DEFAULT_LANG = store.state.lang || 'zh'
const locales = {
  zh: zh,
  en: en
}

const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: locales
})

export default i18n
