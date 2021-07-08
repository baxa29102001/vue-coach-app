<template>
  <section>
    <base-card>
      <h2>Register coach</h2>
      <coach-forum @save-data="saveData"></coach-forum>
    </base-card>
  </section>
</template>
<script>
import CoachForum from '../components/coaches/CoachForum.vue';
export default {
  components: {
    CoachForum
  },
  methods: {
    saveData(formData) {
      this.$store.dispatch('coaches/registerCoach', formData);
      this.$router.push('/coaches');
    }
  }
};
</script>
