<template>
  <base-card>
    <h2>Filter The coaches</h2>

    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="changeHandler" />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="changeHandler" />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="changeHandler" />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  methods: {
    changeHandler(e) {
      const id = e.target.id;
      const checked = e.target.checked;

      this.filter[id] = checked;
      this.$emit('change-filter', this.filter);
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
