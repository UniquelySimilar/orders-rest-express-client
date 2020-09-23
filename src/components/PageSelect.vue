<template>
  <div id="current-page">
    <label style="margin: 0 0.4em; font-weight: normal;">Page</label>
    <select v-bind:value="currentPage" v-on:change="onPageChange">
      <option v-for="page in pageList" v-bind:key="page">{{page}}</option>
    </select>
    <span> of {{ pageCount }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      pageList: {
        type: Array,
        required: true
      },
      pageCount: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      }
    },
    methods: {
      onPageChange(event) {
        this.$emit('pageSelectChangeEvt', event.target.value);
      }
    }
  }
</script>

<style scoped>
  #current-page {
    display: inline-block;
    margin: 25px 0 15px 10px;
    vertical-align: top;
  }
</style>