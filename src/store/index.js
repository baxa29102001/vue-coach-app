import { createStore } from 'vuex';
import coacheModule from './coaches/index.js';
import requestModule from './requests/requestModal.js';

const store = createStore({
  modules: {
    coaches: coacheModule,
    requests: requestModule
  },
  state() {
    return {
      userId: 'c1'
    };
  },
  actions: {},
  mutations: {},
  getters: {
    userId(state) {
      return state.userId;
    }
  }
});

export default store;
