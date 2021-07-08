<template>
  <p v-if="formIsValid" class="error">Fill all the inputs</p>
  <form @submit.prevent="registerHandler">
    <div class="form-control">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" v-model="firstName" />
    </div>
    <div class="form-control">
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model="lastName" />
    </div>

    <div class="form-control">
      <label for="desc">Desciption</label>
      <textarea id="desc" rows="5" v-model="description" />
    </div>

    <div class="form-control">
      <label for="hourlyRate">Hourly Rate</label>
      <input type="number" id="hourlyRate" v-model="hourlyRate" />
    </div>

    <div class="form-control">
      <h2>Area of expertise</h2>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas" />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas" />
        <label for="backend">Backend</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas" />
        <label for="career">Career</label>
      </div>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      areas: [],
      hourlyRate: null,
      description: '',
      formIsValid: false
    };
  },

  methods: {
    registerHandler() {
      if (
        !this.firstName.trim() ||
        !this.lastName.trim() ||
        !this.description.trim() ||
        !this.hourlyRate ||
        this.areas.length <= 0
      ) {
        this.formIsValid = true;
        return;
      }
      const obj = {
        firstName: this.firstName,
        lastName: this.lastName,
        hourlyRate: +this.hourlyRate,
        areas: this.areas,
        description: this.description
      };
      this.$emit('save-data', obj);
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
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
