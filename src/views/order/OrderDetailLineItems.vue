<template>
  <div class="order-detail-lineitems" v-if="order.id">
    <div>
      <span class="component-heading">Order Details</span>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-4">
        <div class="row">
            <div class="col-md-4">
                <label>Status</label>
            </div>
            <div class="col-md-8">{{ getOrderStatusStr(order.order_status) }}</div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <label>Order Date</label>
            </div>
            <div class="col-md-8">{{ order.order_date }}</div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <label>Required Date</label>
            </div>
            <div class="col-md-8">{{ order.required_date }}</div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <label>Shipped Date</label>
            </div>
            <div class="col-md-8">{{ order.shipped_date }}</div>
        </div>
      </div>
    </div>
    <hr>
    <line-item-index v-bind:orderId="order.id" v-bind:initialLineItems="order.line_items" />
    <hr>
    <router-link class="btn btn-outline-dark" :to="{ name: 'customerDetailOrders', params: { customerId: order.customer_id } }">Back</router-link>
  </div>
</template>

<script>
  import { axios, processAjaxAuthError, getOrderStatusStr } from '../../global-vars.js';
  import LineItemIndex from '../lineitem/LineItemIndex.vue';

  export default {
    name: 'OrderDetailLineItems',
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
          // Remove time suffix from dates
          this.order.order_date = this.order.order_date.substring(0,10);
          this.order.required_date = this.order.required_date.substring(0,10);
          if (this.order.shipped_date) {   // NOT null from database/web service
              this.order.shipped_date = this.order.shipped_date.substring(0,10);
          }
          else {
            this.order.shipped_date = null;
          }
        })
        .catch( error => {
          processAjaxAuthError(error, this.$router);
        })
      },
      getOrderStatusStr(status) {
        // Wrap imported function
        return getOrderStatusStr(status);
      }
    },
    created() {
      this.getOrder();
    }
  }
</script>

<style scoped>

</style>