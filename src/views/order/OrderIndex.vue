<template>
  <div id="order-index">
      <div class="table-title">
          <span class="component-heading">Orders</span>
          <router-link class="btn btn-outline-dark" v-if="customerId" :to="{ name: 'orderCreate', params: { customerId: customerId } }">Create Order</router-link>
      </div>
      <!--
          TODO POSSIBILITY: Add filter by status
      <span class="table-subtitle">Click a status to manage Line Items</span>
      -->
      <div class="row" v-if="orders.length">
          <div class="col-md-8">
              <table id="order-table" class="table table-striped table-bordered">
                  <thead>
                      <tr>
                          <th>Status</th>
                          <th>Order Date</th>
                          <th>Required Date</th>
                          <th>Shipped Date</th>
                          <th>&nbsp;</th>
                          <th>&nbsp;</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="order in orders" v-bind:key="order.id">
                          <td>{{ getOrderStatusStr(order.order_status) }}</td>
                          <td>{{ formatDate(order.order_date) }}</td>
                          <td>{{ formatDate(order.required_date) }}</td>
                          <td>{{ formatDate(order.shipped_date) }}</td>
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
  import { axios, processAjaxAuthError } from '../../global-vars.js'
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
          getOrderStatusStr(status) {
              let statusStr = "Unknown";

              switch(status) {
                  case 1:
                      statusStr = "Pending";
                      break;
                  case 2:
                      statusStr = "Processing";
                      break;
                  case 3:
                      statusStr = "Rejected";
                      break;
                  case 4:
                      statusStr = "Completed";
              }

              return statusStr;
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
              })
              .catch(error => {
                  processAjaxAuthError(error, this.$router);
              });
          }
      }
  }

</script>

<style scoped>
  table td {
    padding: 0.4rem;
  }
</style>