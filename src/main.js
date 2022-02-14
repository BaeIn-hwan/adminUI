import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from 'assets/js/firebase.js'

Vue.config.productionTip = false

// 전역 컴포넌트
import TableListComponent from 'components/TableListComponent.vue';
import LocationComponent from 'components/LocationComponent.vue';
import PaginationComponent from 'components/PaginationComponent.vue';

Vue.component('TableListComponent', TableListComponent);
Vue.component('LocationComponent', LocationComponent);
Vue.component('PaginationComponent', PaginationComponent);

// 커스텀 디렉티브
Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
})

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#wrapper')
  }
});