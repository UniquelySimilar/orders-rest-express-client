<template>
  <div id="app" class="container-fluid">
    <div class="row" id="title">
        <span>Customer Orders Client Application for Express REST Service</span>
        <select v-on:change="updateServer">
          <option value="express">Express</option>
          <option value="rails">Rails</option>
        </select>
        <button class="btn btn-light btn-sm" v-on:click="logout">Log Out</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import { axios } from './global-vars.js'

  export default {
    computed: {
      token() {
        return this.$store.state.token;
      }
    },
    methods: {
      logout() {
        axios.put('/logout', {}, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then()
        .catch(error => console.error(error))
        .finally(() => {
          // Regardless of logout success or failure, clear token and redirect to login page
          this.$store.commit('updateToken', { token: '' });
          this.$router.push("/login");
        });
      },
      updateServer(event) {
        this.$store.commit('updateServer', { server: event.target.value})
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /*header {*/
  #title {
    background-color: lightgrey;
    font-size: 1.5em;
    font-weight: bold;
    padding-left: 15px;
    margin-bottom: 15px;
    /*width: 100%;*/
  }

  #title span {
    padding: 5px 0;
  }

  #title button {
    margin-left: auto;
    margin-right: 1em;
  }

  #title select {
    font-size: 0.7em;
    font-weight: normal;
    margin-left: 1em;
  }

  .component-heading {
    font-size: 1.3em;
    font-weight: bold;
    vertical-align: middle;
    margin-right: 2em;
  }

  .table-title {
    margin-bottom: 1em;
  }

  .table-subtitle {
    font-size: 0.75em;
    font-weight: bold;
    margin-top: 0.5em;
  }

  .btn-margin-left {
    margin-left: 1em;
  }

  .btn-margin-right {
    margin-right: 1em;
  }

  .error-msg {
    color: red;
  }

  .align-right {
    text-align: right;
  }

  label {
    font-weight: bold;
  }

</style>