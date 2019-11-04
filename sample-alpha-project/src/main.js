import Vue from 'vue'

import { sync } from 'vuex-router-sync'

import App from './App.vue'

import router from './router'
import store from './store'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import '@/plugins'
import '@/components'

sync(store, router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
