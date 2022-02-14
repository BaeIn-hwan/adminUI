import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from 'assets/js/firebase.js'
import {
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import router from '@/router'
import axios from 'axios'

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
    baseUrl: process.env.NODE_ENV === 'development' ? '//localhost:3001' : process.env.BASE_URL
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
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
  },
  actions: {
    // api
    async requestMethods({state}, payload) {
      const {header, method, url, data} = payload;

      try {
        const requestParams = {
          method: method,
          header: header ? header : {},
          url: `${state.baseUrl}${url}`,
          data: data ? data : null
        };
  
        const response = await axios(requestParams);
        
        if (response && response.status && (response.status == 200 || response.status == 201)) {
          return response;
        }
        else {
          throw ({message: response.status_message});
        }
      }
      catch(err) {
        console.error('request errorr', err);
      }
    },

    // alert
    alertOpen({ commit }, payload) {
      commit('SET_ALERT_OPEN', payload);
    },
    alertClose({ commit }, payload) {
      commit('SET_ALERT_CLOSE', payload);
    },

    // color Change
    colorChange({ commit }, payload) {
      commit('SET_COLOR_CHANGE', payload)
    },

    // login 처리
    async login({ dispatch, commit }, details) {
      const { id, pw } = details;
      
      try {
        await signInWithEmailAndPassword(auth, id, pw);

        commit('SET_USER', auth.currentUser);
        router.push('/');
      }
      catch(err) {
        if (err.code) {
          dispatch('alertOpen', {
            isOpen: true,
            message: '아이디 또는 비밀번호가 일치하지 않습니다.',
          });
        }
      }
    },
    async logout({ commit }) {
      try {
        await signOut(auth);
        
        commit('CLEAR_USER');

        router.push('/login');
      }
      catch(err) {
        console.error('err', err);
      }
    },
    fetchUser({ commit }) {
      auth.onAuthStateChanged(user => {
        if (user === null) {
          commit('CLEAR_USER');
        } else {
          commit('SET_USER', user);
          
          router.onReady(() => {
            if (router.currentRoute.path === '/login') {
              router.push('/');
            }
          });
        }
      });
    }
  },
})