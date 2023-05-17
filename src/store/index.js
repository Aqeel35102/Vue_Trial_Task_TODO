import { createStore } from 'vuex';
import loginModule from "./loginModule"
import createPersistedState from "vuex-persistedstate"
import todoModule from "./todoModule"


export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    loginModule: loginModule,
    todoModule:todoModule,
  },
  getters: {
    // Define your getters here
  },
  plugins: [
    createPersistedState({
        storage: window.sessionStorage,
    })
]
});