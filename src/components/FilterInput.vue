<template>
  <div>
    <span>Filter by </span>
    <select v-model="filterCriteria" v-on:change="updateCriteria()" style="margin-right: 0.5em;">
      <option v-for="criteria in criteriaOptions" v-bind:key="criteria">{{ criteria }}</option>
    </select>
    <input type="text" v-model="filterTerm" v-on:keyup="updateFilterTerm()">
    <button type="button" class="btn btn-outline-dark btn-sm btn-margin-left" v-on:click="clearFilter()">Clear</button>
  </div>
</template>

<script>
  export default {
    name: 'FilterInput',
    props: {
      criteriaOptions: {
        type: Array,
        required: true
      },
      initialCriteria: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        filterTerm: '',
        filterCriteria: this.initialCriteria
      }
    },
    methods: {
      updateCriteria() {
        this.$emit('update-criteria', this.filterCriteria);
        this.clearFilter();
      },
      updateFilterTerm() {
        this.$emit('update-filter-term', this.filterTerm);
      },
      clearFilter() {
        this.filterTerm = '';
        this.updateFilterTerm();
      }
    }
  }
</script>

<style scoped>

</style>