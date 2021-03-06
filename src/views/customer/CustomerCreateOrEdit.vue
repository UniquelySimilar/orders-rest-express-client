<template>
  <div id="customer-create-edit">
    <div>
      <span class="component-heading">{{ pageHeading }}</span>
    </div>
    <hr>
    <form>
      <div class="form-group row">
        <label for="firstName" class="col-md-offset-2 col-md-2 col-form-label">First Name</label>
        <div class="col-md-4">
          <input type="input" class="form-control" id="firstName" v-model="customer.first_name">
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('first_name') }}</span>
        </div>
      </div>
      <div class="form-group row">
        <label for="lastName" class="col-md-offset-2 col-md-2 col-form-label">Last Name</label>
        <div class="col-md-4">
          <input type="input" class="form-control" id="lastName" v-model="customer.last_name">
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('last_name') }}</span>
        </div>
      </div>
      <div class="form-group row">
        <label for="street" class="col-md-offset-2 col-md-2 col-form-label">Street</label>
        <div class="col-md-4">
          <input type="input" class="form-control" id="street" v-model="customer.street">
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('street') }}</span>
        </div>
      </div>
      <div class="form-group row">
        <label for="city" class="col-md-offset-2 col-md-2 col-form-label">City</label>
        <div class="col-md-4">
          <input type="input" class="form-control" id="city" v-model="customer.city">
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('city') }}</span>
        </div>
      </div>
      <div class="form-group row">
        <label for="state" class="col-md-offset-2 col-md-2 col-form-label">State</label>
        <div class="col-md-4">
          <select class="form-control" v-model="customer.state">
            <option v-for="state in stateList" v-bind:key="state">{{state}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="zipcode" class="col-md-offset-2 col-md-2 col-form-label">Zipcode</label>
        <div class="col-md-4">
          <input type="input" class="form-control" id="zipcode" v-model="customer.zipcode">
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('zipcode') }}</span>
        </div>
      </div>
      <div class="form-group row">
        <label for="home-phone" class="col-md-offset-2 col-md-2 col-form-label">Home Phone</label>
        <div class="col-md-4">
          <digits-input component-class="form-control" component-id="home-phone" :num-digits="10"
            :parent-value="customer.home_phone" v-on:updatePhone="updateHomePhone" />
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('home_phone') }}</span>
        </div>
      </div>
      <div class="form-group row">
        <label for="work-phone" class="col-md-offset-2 col-md-2 col-form-label">Work Phone</label>
        <div class="col-md-4">
          <digits-input component-class="form-control" component-id="work-phone" :num-digits="10"
            :parent-value="customer.work_phone" v-on:updatePhone="updateWorkPhone" />
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('work_phone') }}</span>
        </div>
      </div>
      <div class="form-group row">
        <label for="email" class="col-md-offset-2 col-md-2 col-form-label">Email</label>
        <div class="col-md-4">
          <input type="email" class="form-control" id="email" v-model="customer.email">
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('email') }}</span>
        </div>
      </div>

      <div class="form-group row" v-if="error400message">
        <label class="col-md-offset-2 col-md-2 col-form-label">Error Message</label>
        <div class="col-md-4 error-msg">
          <span>{{ error400message }}</span>
        </div>
      </div>

      <div class="form-group row">
        <div class="col-md-offset-4 col-md-2">
          <button type="button" class="btn btn-outline-dark" v-on:click="submitForm">{{ submitBtnLabel }}</button>
          <router-link class="btn btn-outline-dark btn-margin-left" :to="{ name: 'customerIndex' }">Cancel
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { axios, processAjaxAuthError, processValidationErrors, getValidationError, stateList } from '@/global-vars.js'
  import DigitsInput from '@/components/DigitsInput.vue'

  export default {
    name: "CustomerCreateOrEdit",
    components: {
      DigitsInput
    },
    props: {
      customerId: {
        type: Number,
        required: false
      }
    },
    data() {
      return {
        customer: {
          id: undefined,
          first_name: '',
          last_name: '',
          street: '',
          city: '',
          state: 'Colorado',
          zipcode: '',
          home_phone: '',
          work_phone: '',
          email: ''
        },
        validationErrors: [],
        stateList: stateList,
        error400message: ''
      }
    },
    computed: {
      token() {
        return this.$store.state.token
      },
      pageHeading() {
        let heading = "New Customer"
        if (this.customerId) {
          heading = "Edit Customer"
        }
        return heading;
      },
      submitBtnLabel() {
        let btnLabel = "Create"
        if (this.customerId) {
          btnLabel = "Update"
        }
        return btnLabel;
      },
      isExpress() {
        if (this.$store.state.server == 'express') {
          return true;
        }
        else {
          return false;
        }
      }
    },
    methods: {
      getValidationError(fieldName) {
        // Wrap imported function
        return getValidationError(fieldName, this.validationErrors);
      },
      submitForm() {
        axios({
          method: this.customerId ? 'put' : 'post',
          url: this.customer.id ? '/customers/' + this.customerId : '/customers',
          data: this.customer,
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
          .then(() => {
            // Redirect back to Index view
            this.$router.push({ name: 'customerIndex' });
          })
          .catch(error => {
            this.validationErrors = processValidationErrors(error);
            if (this.validationErrors.length === 0) {
              processAjaxAuthError(error, this.$router);
            }
          });
      },
      updateHomePhone(newValue) {
        this.customer.home_phone = newValue;
      },
      updateWorkPhone(newValue) {
        this.customer.work_phone = newValue;
      }
    },
    // Lifecycle hooks
    created() {
      if (this.customerId) {
        axios.get('customers/' + this.customerId, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
          .then(response => {
            this.customer = response.data;
          })
          .catch(error => {
            processAjaxAuthError(error, this.$router);
          });
      }
    },
  }
</script>

<style scoped>
  label {
    text-align: right;
  }
</style>