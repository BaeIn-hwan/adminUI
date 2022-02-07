import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/assets/js/firebase.js'
import Home from '@/views/index.vue'
// import Login from '@/views/login/'
import TemplateList from '@/views/template/list.vue'
import TemplateDetail from '@/views/template/detail.vue'
import TemplateButton from '@/views/template/button.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    }
  }, {
    path: '/template/list',
    name: 'TemplateList',
    component: TemplateList,
  }, {
    path: '/template/detail',
    name: 'TemplateDetail',
    component: TemplateDetail,
  }, {
    path: '/template/button',
    name: 'TemplateButton',
    component: TemplateButton,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // page가 로그인이 필요한지 아닌지 체크
  console.log('Check requiresAuth', requiresAuth)

  // 로그인 정보가 있는 경우
  if (auth.currentUser) {
    next();
  }
  // 로그인 정보가 없는 경우
  else {
    window.location.href = '/login'
  }
})

export default router
