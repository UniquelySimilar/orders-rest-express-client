<template>
  <div id="login">
    <div>
      <span class="component-heading">Login</span>
    </div>
    <hr>
    <form>
      <div class="form-group row">
        <label for="username" class="offset-md-2 col-md-2 col-form-label">User Name</label>
        <div class="col-md-3">
          <input type="input" class="form-control" id="username" v-model="username">
        </div>
      </div>
      <div class="form-group row">
        <label for="password" class="offset-md-2 col-md-2 col-form-label">Last Name</label>
        <div class="col-md-3">
          <input type="password" class="form-control" id="password" v-model="password">
        </div>
      </div>

      <div class="form-group row">
        <div class="offset-md-4 col-md-2">
            <button type="button" class="btn btn-outline-dark"
                v-on:click="login">Login</button>
        </div>
    </div>

    <div v-if="loginError" class="offset-md-4 col-md-4 error-msg">
      <span>*&nbsp;</span>
      <span>Username and/or password not recognized</span>
    </div>
</form>
  </div>
</template>

<script>
  import { axios } from '../global-vars.js';

  export default {
    data() {
      return {
        username: '',
        password: '',
        loginError: false
      }
    },
    methods: {
      login() {
        axios.post('/login',{
          username: this.username,
          password: this.password
        })
        .then( response => {
          this.loginError = false;
          this.$store.commit('updateToken', {
            token: response.data.token
          });
          this.$router.push('/customers');
        })
        .catch( error => {
          if (error.response) {
            if (error.response.status == 401) {
              this.loginError = true;
            }
            else {
              console.error("Response contains error code " + error.response.status);
            }
          }
          else if (error.request) {
            console.error("No response received so logging request");
            console.error(error.request);
          }
          else {
            console.error("Problem with request: " + error.message);
          }
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