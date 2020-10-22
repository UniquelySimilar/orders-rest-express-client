import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "empty-token",
    server: "express"
  },
  mutations: {
    updateToken(state, payload) {
      state.token = payload.token;
    },
    updateServer(state, payload) {
      state.server = payload.server;
    }
  }
});