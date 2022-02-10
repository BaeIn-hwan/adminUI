import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from 'assets/js/firebase.js'

// 어드민
import Main from 'views/Main.vue'
import Index from 'views/index.vue'

// 샘플
import TemplateList from 'views/template/list.vue'
import TemplateDetail from 'views/template/detail.vue'
import TemplateWrite from 'views/template/write.vue'

// FAQ
import FaqList from 'views/csCenter/faq/list.vue'
import FaqDetail from 'views/csCenter/faq/detail.vue'
import FaqWrite from 'views/csCenter/faq/write.vue'

// Notice
import NoticeList from 'views/csCenter/notice/list.vue'
import NoticeDetail from 'views/csCenter/notice/detail.vue'

// 로그인
import Login from 'views/login/'
import Test from 'views/login/test.vue'
import Test01 from 'views/login/test01.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [{
      path: '/',
      name: 'Index',
      component: Index,
    }, {
      path: 'template/list',
      name: 'TemplateList',
      component: TemplateList,
    }, {
      path: 'template/detail',
      name: 'TemplateDetail',
      component: TemplateDetail,
    }, {
      path: 'template/write',
      name: 'TemplateWrite',
      component: TemplateWrite,
    }, {
      path: 'faq/list',
      name: 'FaqList',
      component: FaqList,
    }, {
      path: 'faq/detail',
      name: 'FaqDetail',
      component: FaqDetail,
    }, {
      path: 'faq/write',
      name: 'FaqWrite',
      component: FaqWrite,
    }, {
      path: 'notice/list',
      name: 'NoticeList',
      component: NoticeList,
    }, {
      path: 'notice/detail',
      name: 'NoticeDetail',
      component: NoticeDetail,
    }],
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/login',
    name: 'LoginPage',
    component: Login,
    // children: [{
    //   path: 'test',
    //   name: "Test",
    //   component: Test
    // }, {
    //   path: 'test01',
    //   name: "Test01",
    //   component: Test01
    // }],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log('requiresAuth', requiresAuth)
  console.log('auth', auth)
  console.log('auth', auth.currentUser)
  next();
})

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // page가 로그인이 필요한지 아닌지 체크
//   console.log('Check requiresAuth', requiresAuth)

//   // 로그인 정보가 있는 경우
//   if (auth.currentUser) {
//     next();
//   }
//   // 로그인 정보가 없는 경우
//   else {
//     window.location.href = '/login'
//   }
// })

export default router
