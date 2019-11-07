import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import VueI18n from 'vue-i18n'
import zhTW from 'vee-validate/dist/locale/zh_TW'

import App from './App'
import router from './router'
import './bus'
import currencyFilter from './filters/currency'
import Pagination from '@/components/Pagination'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(BootstrapVue)

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zhTW'
})

Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
})

Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)
Vue.component('Pagination', Pagination)

axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  render: h => h(App)
})

router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next)
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      console.log(response.data)
      if (response.data.success) {
      // vm.$router.push('/')
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
