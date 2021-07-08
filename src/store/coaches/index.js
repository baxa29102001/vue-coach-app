export default {
  namespaced: true,
  state() {
    return {
      coachData: [
        {
          id: 'c1',
          firstName: 'Maximilian',
          lastName: 'Schwarzmüller',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30
        },
        {
          id: 'c2',
          firstName: 'Julie',
          lastName: 'Jones',
          areas: ['frontend', 'career'],
          description:
            'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30
        }
      ]
    };
  },
  getters: {
    coachGet(state) {
      return state.coachData;
    },
    hasCoaches(state) {
      return state && state.coachData.length > 0;
    },
    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.coachGet;
      const userId = rootGetters.userId;

      return coaches.some(item => item.id === userId);
    }
  },
  mutations: {
    pushData(state, payload) {
      state.coachData.unshift(payload);
    },
    setCoaches(state, payload) {
      state.coachData = payload;
    }
  },
  actions: {
    async registerCoach(context, data) {
      const userId = context.rootGetters.userId;
      const coachObj = {
        ...data
      };

      let res = await fetch(
        `https://vuejs-coaches-default-rtdb.firebaseio.com/coaches/${userId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(coachObj)
        }
      );
      const dataCoach = await res.json();
      console.log(dataCoach);
      context.commit('pushData', { ...coachObj, id: userId });
    },

    async loadCoaches(context) {
      const res = await fetch(
        'https://vuejs-coaches-default-rtdb.firebaseio.com/coaches.json'
      );
      const dataCoaches = await res.json();
      console.log(dataCoaches);
      const coaches = [];
      for (let i in dataCoaches) {
        const coach = {
          firstName: dataCoaches[i].firstName,
          lastName: dataCoaches[i].lastName,
          description: dataCoaches[i].description,
          hourlyRate: dataCoaches[i].hourlyRate,
          areas: dataCoaches[i].areas,
          id: i
        };
        coaches.push(coach);
      }

      context.commit('setCoaches', coaches);
    }
  }
};
