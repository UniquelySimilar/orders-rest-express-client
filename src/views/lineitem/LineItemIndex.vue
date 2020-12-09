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
              <td>
                <a href="#" @click.prevent="openDeleteModal(lineItem.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <delete-modal v-if="deleteModalOpen"
      deleteMessage="Delete line item?"
      @closeDeleteModalEvent="closeDeleteModal"
      @deleteRecordEvent="deleteLineItem" />
  </div>
</template>

<script>
  import DeleteModal from '@/components/DeleteModal.vue';
  import { axios, processAjaxAuthError } from '@/global-vars.js'

  export default {
    components: {
      DeleteModal
    },
    data() {
      return {
        lineItems: this.initialLineItems,
        deleteLineItemId: 0,
        deleteModalOpen: false
      }
    },
    props: {
      orderId: {
        type: Number,
        required: true
      },
      initialLineItems: {
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
      openDeleteModal(id) {
        this.deleteLineItemId = id;
        this.deleteModalOpen = true;
      },
      closeDeleteModal() {
        this.deleteModalOpen = false;
      },
      deleteLineItem() {
        let id = this.deleteLineItemId;
        axios.delete('/lineitems/' + id, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then( () => {
          // Remove lineitem from array
          this.lineItems = this.lineItems.filter( lineItem => {
            return lineItem.id !== id;
          });
        })
        .catch( error => {
          processAjaxAuthError(error, this.$router);
        })
        .finally( () => this.closeDeleteModal() );
      }
    }
  }
</script>

<style scoped>
  table td {
    padding: 0.4rem;
  }
</style>