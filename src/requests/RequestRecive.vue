<template>
  <section>
    <base-card>
      <header>
        <h2>Requests recived</h2>
      </header>
      <ul v-if="hasRequets">
        <request-item
          v-for="request in requets"
          :key="request.id"
          :email="request.email"
          :message="request.message"
        ></request-item>
      </ul>
      <h3 v-else>You havent any Requests</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../components/requests/RequestItem.vue';
export default {
  components: {
    RequestItem
  },
  computed: {
    requets() {
      return this.$store.getters['requests/getRequests'];
    },
    hasRequets() {
      return this.$store.getters['requests/hasRequests'];
    }
  },
  methods: {
    loadRequet() {
      this.$store.dispatch('requests/fetchRequets');
    }
  },

  created() {
    this.loadRequet();
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
