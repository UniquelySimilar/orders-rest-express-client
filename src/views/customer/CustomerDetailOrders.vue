<template>
  <div id="customer-detail-orders">
    <div>
      <span class="component-heading">Customer Details</span>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-4">
        <div class="row">
          <div class="col-md-4">
            <label>First Name:</label>
          </div>
          <div class="col-md-8">{{customer.first_name}}</div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label>Last Name:</label>
          </div>
          <div class="col-md-8">{{customer.last_name}}</div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label>Street:</label>
          </div>
          <div class="col-md-8">{{customer.street}}</div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label>City/State/Zip:</label>
          </div>
          <div class="col-md-8">{{getCityStateZip(customer)}}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="row">
          <div class="col-md-4">
            <label>Home Phone:</label>
          </div>
          <div class="col-md-8">{{customer.home_phone}}</div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label>Work Phone:</label>
          </div>
          <div class="col-md-8">{{customer.work_phone}}</div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label>Email:</label>
          </div>
          <div class="col-md-8">{{customer.email}}</div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label>&nbsp;</label>
          </div>
          <div class="col-md-8">&nbsp;</div>
        </div>
      </div>
    </div>
    <hr>
    <order-index v-if="customer.id" v-bind:customerId="customer.id" v-bind:initialOrders="customer.orders">
    </order-index>
    <hr>
    <router-link class="btn btn-outline-dark" :to="{ name: 'customerIndex' }">Back</router-link>
  </div>
</template>

<script>
  import OrderIndex from '../order/OrderIndex.vue'
  import { axios, processAjaxAuthError } from '../../global-vars.js'

  export default {
    name: "CustomerDetailOrders",
    components: {
      OrderIndex
    },
    props: {
      customerId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        customer: {
          id: 0,
          orders: []
        },
      }
    },
    computed: {
      token() {
        return this.$store.state.token
      }
    },
    methods: {
      getCityStateZip(customer) {
        return customer.city + ", " + customer.state + " " + customer.zipcode;
      }
    },
    // Lifecycle hooks
    created() {
      axios.get('/customers/' + this.customerId, {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      })
        .then(response => {
          this.customer = response.data;
          this.customer.orders.forEach(order => {
            order.order_date = order.order_date.substring(0, 10);
            order.required_date = order.required_date.substring(0, 10);
            if (order.shipped_date) {
              order.shipped_date = order.shipped_date.substring(0, 10);
            }
          });
        })
        .catch(error => {
          processAjaxAuthError(error, this.$router);
        });
    }
  }
</script>

<style scoped>
</style>