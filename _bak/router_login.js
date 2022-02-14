import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from 'assets/js/firebase.js'
import Login from 'views/login/'
import Test from 'views/login/test.vue'
import Test01 from 'views/login/test01.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: Login,
    children: [{
      path: 'test',
      name: "Test",
      component: Test
    }, {
      path: 'test01',
      name: "Test01",
      component: Test01
    }],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(auth.currentUser)
  next();

  console.log('to', to)
  console.log('from', from)
  // if (!auth.currentUser) {
  //   next();
  // }
  // else {
  //   window.location.href = '/';
  // }
})

export default router
