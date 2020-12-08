<template>
  <div id="order-index">
      <div class="table-title">
          <span class="component-heading">Orders</span>
          <router-link class="btn btn-outline-dark" v-if="customerId" :to="{ name: 'orderCreate', params: { customerId: customerId } }">Create Order</router-link>
      </div>
      <div class="row" v-if="orders.length">
          <div class="col-md-8">
              <table class="table table-striped table-bordered">
                  <thead>
                      <tr>
                          <th>Status</th>
                          <th>Order Date</th>
                          <th>Required Date</th>
                          <th>Shipped Date</th>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                      </tr>
                  </thead>
                  <!-- TODO: formatDate should no longer be necessary -->
                  <tbody>
                      <tr v-for="order in orders" v-bind:key="order.id">
                          <td>{{ getOrderStatusStr(order.order_status) }}</td>
                          <td>{{ formatDate(order.order_date) }}</td>
                          <td>{{ formatDate(order.required_date) }}</td>
                          <td>{{ formatDate(order.shipped_date) }}</td>
                          <td><router-link :to="{ name: 'orderDetailLineItems', params: { orderId: order.id } }">Line Items</router-link></td>
                          <td><router-link :to="{ name: 'orderEdit', params: { customerId: customerId, orderId: order.id } }">Edit</router-link></td>
                          <td><a href="#" v-on:click="displayDeleteModal(order.id)">Delete</a></td>
                      </tr>
                  </tbody>
              </table>

              <delete-modal
              v-if="deleteModal"
              :deleteMessage="deleteMessage"
              @closeDeleteModalEvent="closeDeleteModal"
              @deleteRecordEvent="deleteOrder" />
              </div>
      </div>
  </div>
</template>

<script>
  import { axios, processAjaxAuthError, getOrderStatusStr } from '../../global-vars.js'
  import DeleteModal from '../../components/DeleteModal.vue'

  export default {
      name: 'OrderIndex',
      components: {
          DeleteModal
      },
      props: {
          customerId: {
              type: Number,
              required: true
          },
          initialOrders: {
              type: Array,
              required: true
          }
      },
      data() {
          return {
              orders: this.initialOrders,
              deleteOrderId: 0,
              deleteModal: false,
              deleteMessage: 'Delete this order?'
          }
      },
      computed: {
          token() {
              return this.$store.state.token;
          }
      },
      methods: {
          formatDate(milliseconds) {
              if (!milliseconds)
                  return;

              let date = new Date(milliseconds);
              return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
          },
          displayDeleteModal(id) {
              this.deleteOrderId = id;
              this.deleteModal = true;
          },
          closeDeleteModal() {
              this.deleteModal = false;
          },
          deleteOrder() {
              let id = this.deleteOrderId;
              axios.delete('/orders/' + id, {
                  headers: {
                      'Authorization': 'Bearer ' + this.token
                  }
              })
              .then( () => {
                  // Remove order from orders array
                  this.orders = this.orders.filter( order => {
                      return order.id !== id;
                  });
                  // Close delete modal
                  this.deleteModal = false;
              })
              .catch(error => {
                  processAjaxAuthError(error, this.$router);
              });
          },
          getOrderStatusStr(status) {
              // Wrap imported function
              return getOrderStatusStr(status);
          }
      }
  }

</script>

<style scoped>
  table td {
    padding: 0.4rem;
  }
</style>