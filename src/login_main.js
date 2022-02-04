import Vue from 'vue'
import Login from './Login.vue'
import router from './router/login_main.js'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Login)
}).$mount('#wrapper')
