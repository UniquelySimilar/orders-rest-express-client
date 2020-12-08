<template>
  <div class="line-item-index">
    <div class="table-title">
      <span class="component-heading">Line Items</span>
      <router-link class="btn btn-outline-dark" v-if="orderId" :to="{ name: 'customerIndex' }">Create Line Item</router-link>
    </div>
    <div class="row" v-if="lineItems.length">
      <div class="col-md-8">
        <table class="table table-striped table-bordered">
          <thead>
            <th>Product</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </thead>
          <tbody>
            <tr v-for="lineItem in lineItems" v-bind:key="lineItem.id">
              <td>PLACEHOLDER</td>
              <td>{{ lineItem.unit_price }}</td>
              <td>{{ lineItem.quantity }}</td>
              <td>EDIT</td>
              <td>DELETE</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      orderId: {
        type: Number,
        required: true
      },
      lineItems: {
        type: Array,
        required: true
      }
    },
    computed: {
      token() {
        return this.$store.state.token
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  table td {
    padding: 0.4rem;
  }
</style>