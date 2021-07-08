export default {
  namespaced: true,
  state() {
    return {
      requests: []
    };
  },
  getters: {
    getRequests(state, _, _2, rotGetters) {
      const id = rotGetters.userId;
      const requetsData = state.requests.filter(item => item.coachId === id);
      return requetsData;
    },
    hasRequests(state) {
      return state.requests && state.requests.length > 0;
    }
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
      console.log(state.requests);
    },

    setRequest(state, payload) {
      state.requests = payload;
    }
  },
  actions: {
    contactCoach(context, payload) {
      const newRequest = {
        email: payload.email,
        message: payload.message
      };

      fetch(
        `https://vuejs-coaches-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
        {
          method: 'POST',
          body: JSON.stringify(newRequest)
        }
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          newRequest.id = data.name;
          newRequest.coachId = payload.coachId;

          context.commit('addRequest', newRequest);
        });
    },
    fetchRequets(context) {
      const id = context.rootGetters.userId;
      fetch(
        `https://vuejs-coaches-default-rtdb.firebaseio.com/requests/${id}.json`
      )
        .then(res => res.json())
        .then(data => {
          const requests = [];

          for (let key in data) {
            requests.push({
              id: key,
              coachId: id,
              message: data[key].message,
              email: data[key].email
            });
          }

          context.commit('setRequest', requests);
        });
    }
  }
};
