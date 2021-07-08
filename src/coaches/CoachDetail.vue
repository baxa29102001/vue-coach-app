<template>
  <section>
    <base-card>
      <h2>
        {{ fullName }}
      </h2>
      <h3>${{ selectedCoach.hourlyRate }}/hour</h3>
    </base-card>
  </section>

  <section>
    <base-card>
      <header>
        <h2>Interseted in this conatact us</h2>
        <base-button :link="true" :to="coachContactLink">Conatact</base-button>
      </header>

      <router-view></router-view>
    </base-card>
  </section>

  <section>
    <base-card>
      <base-badge
        v-for="area in selectedCoach.areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
      <p>{{ selectedCoach.description }}</p>
    </base-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: ''
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    coachContactLink() {
      return '/coaches/' + this.selectedCoach.id + '/contact';
    },
    ...mapGetters({
      data: 'coaches/coachGet'
    })
  },
  created() {
    this.selectedCoach = this.data.find(item => item.id === this.id);
  }
};
</script>
