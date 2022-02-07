import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from '@/assets/js/firebase.js'
import TableListComponent from '@/components/TableListComponent.vue';
import LocationComponent from '@/components/LocationComponent.vue';

Vue.config.productionTip = false

// Global Component
Vue.component('TableListComponent', TableListComponent);
Vue.component('LocationComponent', LocationComponent);

let app;

auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#wrapper')
  }
});