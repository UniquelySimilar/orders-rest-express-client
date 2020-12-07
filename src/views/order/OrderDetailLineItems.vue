<template>
  <div class="order-detail">
    <h2>Order Detail Line Items</h2>
    <line-item-index v-if="order.id" v-bind:orderId="order.id" v-bind:lineItems="order.line_items" />
    <router-link v-if="order.id" :to="{ name: 'customerDetailOrders', params: { customerId: order.customer_id } }">Back</router-link>
  </div>
</template>

<script>
  import { axios, processAjaxAuthError } from '../../global-vars.js';
  import LineItemIndex from '../lineitem/LineItemIndex.vue';

  export default {
    components: {
      LineItemIndex
    },
    data() {
      return {
        order: {}
      }
    },
    props: {
      orderId: {
        type: Number,
        required: true
      }
    },
    computed: {
      token() {
        return this.$store.state.token
      }
    },
    methods: {
      getOrder() {
        axios.get('/orders/' + this.orderId,
        {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then( response => {
          this.order = response.data;
        })
        .catch( error => {
          processAjaxAuthError(error, this.$router);
        })
      }
    },
    created() {
      this.getOrder();
    }
  }
</script>

<style scoped>

</style>