import Vue from 'vue'
import Login from './Login.vue'
import router from './router/login.js'
import store from './store'
import { auth } from '@/assets/js/firebase.js'

Vue.config.productionTip = false

let app;

auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(Login)
    }).$mount('#wrapper')
  }
});