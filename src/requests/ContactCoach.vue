<template>
  <p v-if="formIsValid" class="error">Please fill all input</p>
  <form @submit.prevent="submitHandler">
    <div class="form-control">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea id="message" v-model="message" />
    </div>

    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      formIsValid: false
    };
  },
  methods: {
    submitHandler() {
      if (!this.email.trim() || !this.message.trim()) {
        this.formIsValid = true;
        return;
      }

      const messageObj = {
        email: this.email,
        message: this.message,
        coachId: this.$route.params.id
      };
      this.$store.dispatch('requests/contactCoach', messageObj);
      this.$router.push('/coaches');
    }
  }
};
</script>

<style scoped>
.error {
  color: white;
  background-color: salmon;
  padding: 1rem;
  text-align: center;
  font-size: 20px;
}
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
