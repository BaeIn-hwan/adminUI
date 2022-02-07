import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/assets/js/firebase.js'
import Login from '@/views/login/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: Login,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!auth.currentUser) {
    next();
  }
  else {
    window.location.href = '/';
  }
})

export default router
