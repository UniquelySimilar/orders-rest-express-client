<template>
  <div class="lineitem-create-edit">
    <span class="component-heading">{{ pageHeading }}</span>
    <hr>
    <form>
      <div class="form-group row">
        <label for="unitPrice" class="col-md-offset-2 col-md-2 col-form-label">Unit Price</label>
        <div class="col-md-3">
          <input type="input" class="form-control" id="unitPrice"
           :value="unitPriceToFixed"
           @change="updateUnitPrice">
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('unit_price') }}</span>
        </div>
      </div>

      <div class="form-group row">
        <label for="quantity" class="col-md-offst-2 col-md-2 col-form-label">Quantity</label>
        <div class="col-md-3">
          <input type="input" class="form-control" id="quantity" v-model="lineItem.quantity">
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('quantity') }}</span>
        </div>
      </div>

      <div class="form-group row">
        <div class="col-md-offset-4 col-md-2">
          <button type="button" class="btn btn-outline-dark" v-on:click="submitForm">{{ submitBtnLabel }}</button>
          <router-link class="btn btn-outline-dark" :to="{ name: 'orderDetailLineItems', params: {orderId: orderId} }">Cancel</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { axios, processAjaxAuthError, processValidationErrors, getValidationError } from '@/global-vars.js';

  export default {
    data() {
      return {
        lineItem: {
          id: this.lineItemId,
          order_id: this.orderId,
          unit_price: 0.01,
          quantity: 0
        },
        validationErrors: []
      }
    },
    props: {
      orderId: {
        type: Number,
        required: true
      },
      lineItemId: {
        type: Number,
        required: false
      }
    },
    computed: {
      pageHeading() {
        return this.lineItemId ? 'Edit Line Item' : 'Create Line Item';
      },
      submitBtnLabel() {
        return this.lineItemId ? 'Update' : 'Create'
      },
      token() {
        return this.$store.state.token;
      },
      unitPriceToFixed() {
        return this.lineItem.unit_price.toFixed(2);
      }
    },
    methods: {
      updateUnitPrice(event) {
        // Convert value back to float so computed unitPriceToFixed works
        this.lineItem.unit_price = parseFloat(event.target.value);
      },
      getLineItem() {
        axios.get('/lineitems/' + this.lineItemId, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then( response => {
          this.lineItem = response.data;
        })
        .catch(error => processAjaxAuthError(error, this.$router));
      },
      submitForm() {
        let id = this.lineItemId;
        axios({
          method: id ? 'put' : 'post',
          url:    id ? '/lineitems/' + id : '/lineitems',
          data:   this.lineItem,
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then( () => {
          this.$router.push({ name: 'orderDetailLineItems', params: {orderId: this.orderId} })
        })
        .catch( (error) => {
          this.validationErrors = processValidationErrors(error);
          if (this.validationErrors.length === 0) {
            processAjaxAuthError(error, this.$router);
          }
        });
      },
      getValidationError(fieldName) {
        // Wrap imported function
        return getValidationError(fieldName, this.validationErrors);
      }
    },
    created() {
      if (this.lineItemId) {
        this.getLineItem();
      }
    }
  }
</script>

<style scoped>
  label {
      text-align: right;
  }
</style>