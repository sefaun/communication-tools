import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '../src/locales/i18n'

//Ana CSS'ler
import '../src/assets/styles/app.scss'

//Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

//Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

//Componentleri ve Componentlerin Dilini Ayarlıyor.
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

const mainVue = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

export default mainVue;