<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadData">Refresh</base-button>
        <base-button :link="true" v-if="!isCoach" to="/register"
          >Register Coach</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="!isLoading && hasCoach">
        <coach-item
          v-for="coach in coachesData"
          :key="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
          :id="coach.id"
          >{{ coach.firstName }}</coach-item
        >
      </ul>
      <h2 v-else>No founded couches</h2>
    </base-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import CoachItem from '../components/coaches/CoachItem.vue';
import CoachFilter from '../components/coaches/CoachFilter.vue';
import BaseSpinner from '../components/ui/BaseSpinner.vue';
export default {
  components: {
    CoachItem,
    CoachFilter,
    BaseSpinner
  },
  data() {
    return {
      activeFilter: {
        frontend: true,
        backend: true,
        career: true
      },
      isLoading: false
    };
  },

  computed: {
    ...mapGetters({
      coaches: 'coaches/coachGet',
      hasCoach: 'coaches/hasCoaches',
      isCoach: 'coaches/isCoach'
    }),

    coachesData() {
      const app = this.coaches.filter(coach => {
        if (this.activeFilter.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilter.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilter.career && coach.areas.includes('career')) {
          return true;
        }

        return false;
      });

      return app;
    }
  },
  methods: {
    setFilters(filter) {
      this.activeFilter = filter;
    },
    async loadData() {
      this.isLoading = true;
      await this.$store.dispatch('coaches/loadCoaches');
      this.isLoading = false;
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
