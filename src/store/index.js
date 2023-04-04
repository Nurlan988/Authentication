import { createStore } from 'vuex'
import axios from "axios";
import router from '../router/index';

export default createStore({
  state: {
    token: '',
    // username: '',
  },
  getters: {
    // setUsername(state){
    //   state.username = dispatch('signIn', response.data)
    // },
    isAuthentication(state){
      return state.token !== ''
    }
  },
  mutations: {
    setToken(state, token){
      state.token = token;
    },
    clearToken(state) {
      state.token = ''
    }
  },
  actions: {
    initAuth({commit, dispatch}){
      let token = localStorage.getItem('token');
      if(token){
        commit('setToken', token);
        router.push({path: "/"});
      } else {
        router.push({name: "login"});
        return false
      }
    },
    async signIn({commit, dispatch, state}, authData){
      await axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDeOxRW6cu2AoKjZ5n1xXl03QAMabe975Y",
          {
            username: authData.username,
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .then((response) => {
          commit('setToken', response.data.idToken);
          localStorage.setItem('token', response.data.idToken);
        });
    },
    async signUp({commit, dispatch, state}, authData){
      await axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDeOxRW6cu2AoKjZ5n1xXl03QAMabe975Y",
          {
            username: authData.username,
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .then((response) => {
          commit('setToken', response.data.idToken);
          localStorage.setItem('token', response.data.idToken);
        })
    },
    logOut({commit, dispatch, state}){
      commit('clearToken');
      localStorage.removeItem('token');
      router.push({ name: "login" });
    }
  },
  modules: {
  }
})
