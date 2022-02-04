import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/'
import { auth } from '@/assets/js/firebase.js'
import {
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alert: {
      isOpen: false,
      width: 0,
      height: 0,
      message: '',
      returnURL: '',
    },
    pointColor: '#205fb4',
    colorChip: [{
      color: 'blue',
      colorName: '파랑',
      colorCode: '#205fb4'
    }, {
      color: 'green',
      colorName: '초록',
      colorCode: '#82b024'
    }, {
      color: 'orange',
      colorName: '주황',
      colorCode: '#ff7d39'
    }, {
      color: 'red',
      colorName: '빨강',
      colorCode: '#cf1218'
    }, {
      color: 'purple',
      colorName: '보라',
      colorCode: '#613dc9'
    }],
    user: null,
  },
  mutations: {
    SET_ALERT_OPEN(state, alertData) {
      state.alert = Object.assign(state.alert, alertData);
    },
    SET_ALERT_CLOSE(state, alertData) {
      state.alert = Object.assign(state.alert, alertData);
    },
    SET_COLOR_CHANGE(state, color) {
      state.pointColor = color;
    },
    SET_USER (state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
  },
  actions: {
    alertOpen({commit}, payload) {
      commit('SET_ALERT_OPEN', payload);
    },
    alertClose({commit}, payload) {
      commit('SET_ALERT_CLOSE', payload);
    },
    colorChange({commit}, payload) {
      commit('SET_COLOR_CHANGE', payload)
    },
    async login({ dispatch, commit }, details) {
      const { id, pw } = details;

      try {
        const response = await signInWithEmailAndPassword(auth, id, pw);
        console.log(response)
      }
      catch(err) {
        console.log(err)
        if (err.code) {
          dispatch('alertOpen', {
            isOpen: true,
            message: '아이디 또는 비밀번호가 일치하지 않습니다.',
          });
        }

        return;
      }

      commit('SET_USER', auth.currentUser);

      window.location.href = "/";
    },
    async logout({ commit }) {
      await signOut(auth);

      commit('CELAR_USER');
    },
    fetchUser({ commit }) {
      auth.onAuthStateChanged(async user => {
        console.log("fetchUser user", user)

        if (user === null) {
          commit('CELAR_USER');
        } else {
          commit('SET_USER', user);

          console.log("router", router)

          // if ( router.currentRoute.value.path === '/login' ) {
          //   window.location.href = "/";
          // }
        }
      })
    }
  },
})