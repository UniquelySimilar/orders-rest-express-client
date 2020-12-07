<template>
  <div class="line-item-index">
    <h3>Line Item Index</h3>
    <table>
      <thead>
        <th>Product</th>
        <th>Unit Price</th>
        <th>Quantity</th>
      </thead>
      <tbody>
        <tr v-for="lineItem in lineItems" v-bind:key="lineItem.id">
          <td>PLACEHOLDER</td>
          <td>{{ lineItem.unit_price }}</td>
          <td>{{ lineItem.quantity }}</td>
        </tr>
      </tbody>
    </table>
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

</style>