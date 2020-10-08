<template>
    <div id="order-create-edit">
        <span class="component-heading">{{ pageHeading }}</span>
        <hr>
        <form>
            <div class="form-group row">
                <label for="orderStatus" class="col-md-offset-2 col-md-2 col-form-label">Status</label>
                <div class="col-md-4">
                    <select id="orderStatus" v-model="order.order_status">
                        <option v-for="status in orderStatusList" v-bind:value="status.value" v-bind:key="status.value">{{status.text}}</option>
                    </select>
                </div>
            </div>

            <div class="form-group row">
                <label for="orderDate" class="col-md-offset-2 col-md-2 col-form-label">Order Date</label>
                <div class="col-md-2">
                    <datepicker id="orderDate" :dateFormat="dateFormat" :dateType="1" :initialDate="order.order_date"
                     v-on:update-date="updateDate"></datepicker>
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('order_date') }}</span>
                </div>
            </div>

            <div class="form-group row">
                <label for="requiredDate" class="col-md-offset-2 col-md-2 col-form-label">Required Date</label>
                <div class="col-md-2">
                    <datepicker id="requiredDate" :dateFormat="dateFormat" :dateType="2" :initialDate="order.required_date"
                     v-on:update-date="updateDate"></datepicker>
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('required_date') }}</span>
                </div>
            </div>

            <!-- Only display Shipped Date on edit form-->
            <div class="form-group row" v-if="orderId">
                <label for="shippedDate" class="col-md-offset-2 col-md-2 col-form-label">Shipped Date</label>
                <div class="col-md-3">
                    <datepicker id="shippedDate" :dateFormat="dateFormat" :dateType="3" :initialDate="order.shipped_date"
                     v-on:update-date="updateDate"></datepicker>
                     <button type="button" class="btn btn-outline-dark btn-xs btn-margin-left" @click="clearShippedDate">Clear</button>
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('shipped_date') }}</span>
                </div>
            </div>

            <div class="form-group row" v-if="error400message">
                <label for="email" class="col-md-offset-2 col-md-2 col-form-label">Error Message</label>
                <div class="col-md-4 error-msg">
                    <span>{{ error400message }}</span>
                </div>
            </div>
    
            <div class="form-group row">
                <div class="col-md-offset-4 col-md-2">
                    <button type="button" class="btn btn-outline-dark"
                        v-on:click="submitForm">{{ submitBtnLabel }}</button>
                    <router-link class="btn btn-outline-dark" :to="{ name: 'customerDetailOrders', params: { id: customerId } }">Cancel</router-link>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import { axios, processAjaxAuthError } from '../../global-vars.js'
    import Datepicker from '../../components/Datepicker.vue'

    export default {
        name: "OrderCreateOrEdit",
        components: {
            'datepicker': Datepicker
        },
        props: {
            orderId: {
                type: Number,
                required: false
            },
            customerId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                order: {
                    id: this.orderId,
                    customer_id: this.customerId,
                    order_status: 1,
                    order_date: this.getCurrentDateISOString(),
                    required_date: this.getCurrentDateISOString(),
                    shipped_date: null
                },
                orderStatusList: [
                    { text: "Pending", value: "1" },
                    { text: "Processing", value: "2" },
                    { text: "Rejected", value: "3" },
                    { text: "Completed", value: "4" },
                ],
                validationErrors: [],
                error400message: '',
                dateFormat: "yy-mm-dd",
                // Hard code to noon Mountain Time for testing
                timeZoneSuffix: "T12:00:00-06:00",
            }
        },
        computed: {
            token() {
                return this.$store.state.token
            },
            pageHeading() {
                let heading = "New Order";
                if (this.orderId) {
                    heading = "Edit Order";
                }
                return heading;
            },
            submitBtnLabel() {
                let btnLabel = "Save";
                if (this.orderId) {
                    btnLabel = "Update";
                }
                return btnLabel;
            }
        },
        methods: {
            getCurrentDateISOString() {
                let currentDate = new Date().toISOString().substring(0,10);
                //console.log('current date: ' + currentDate);
                return currentDate;
            },
            getValidationError(fieldName) {
                let returnValue;

                let foundElement = this.validationErrors.find(function (element) {
                    return element.param === fieldName;
                });

                if (foundElement !== undefined) {
                    returnValue = foundElement.msg;
                }

                return returnValue;
            },
            updateDate(payload) {
                //console.log("updateDate payload.dtValue: " + payload.dtValue);
                switch(payload.dtType) {
                    case 1:
                        //this.order.order_date = new Date(payload.dtValue + this.timeZoneSuffix);
                        this.order.order_date = payload.dtValue;
                        //console.log("New order_date: " + this.order.order_date);
                        break;
                    case 2:
                        this.order.required_date = payload.dtValue;
                        //console.log("New required_date: " + this.order.required_date);
                        break;
                    case 3:
                        this.order.shipped_date = payload.dtValue;
                        //console.log("New shipped_date: " + this.order.shipped_date);
                        break;
                    default:
                        console.log("ERROR: Unrecognized date type: " + payload.dtType);
                }
            },
            clearShippedDate() {
                this.order.shipped_date = null;
            },
            submitForm() {
                axios({
                    method: this.orderId ? 'put' : 'post',
                    url: this.orderId ? '/orders/' + this.orderId : '/orders',
                    data: this.order,
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(() => {
                    // Redirect back to CustomerDetailOrders view
                    this.$router.push({ name: 'customerDetailOrders', params: { id: this.customerId} });
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status == 400) {
                            // Validation errors
                            if (error.response.data.errors) {    // Property containing array of error objects
                                this.validationErrors = error.response.data.errors;
                                console.log(this.validationErrors);
                            }
                            else {  // Single error message from server
                                this.error400message = error.response.data;
                                console.log(this.error400message);
                            }
                        }
                        else if (error.response.status == 401) {
                            console.log("401 error so redirect to login");
                            this.$router.push("/login");
                        }
                        else {
                            console.error("Response contains error code " + error.response.status);
                        }
                    } else if (error.request) {
                        console.error("No response received so logging request");
                        console.error(error.request);
                    } else {
                        console.error("Problem with request: " + error.message);
                    }
                });
            },
        },
        // Lifecycle hooks
        created() {
            if (this.orderId) {
                axios.get('/orders/' + this.orderId, {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then( response => {
                    this.order = response.data;
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
                });
            }
        }
    }
</script>

<style scoped>
  label {
      text-align: right;
  }
</style>