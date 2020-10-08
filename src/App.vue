<template>
  <div id="app" class="container-fluid">
    <div class="row" id="title">
        <span>Customer Orders Client Application for Express REST Service</span>
        <button class="btn btn-light btn-sm" v-on:click="logout">Log Out</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    methods: {
      logout() {
        this.$store.commit('updateToken', { token: '' });
        this.$router.push("/login");
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

</style>