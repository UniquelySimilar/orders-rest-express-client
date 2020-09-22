<template>
  <div class="customer-index">
    <h2>Customer Index</h2>
  </div>
</template>

<script>
  import { axios } from '../../global-vars.js'
  export default {
    data() {
      return {
        customers: []
      }
    },
    methods: {
      getCustomers() {
        axios.get('/customers')
        .then( response => {
          this.customers = response.data;
        })
        .catch( error => {
          console.log(error)
        })
      }
    },
    created() {
      this.getCustomers();
    }

  }
</script>

<style scoped>
  
</style>