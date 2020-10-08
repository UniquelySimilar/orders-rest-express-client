import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "empty-token"
  },
  mutations: {
    updateToken(state, payload) {
      state.token = payload.token;
    }
  }
});