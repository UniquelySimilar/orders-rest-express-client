<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <header>
        <span>Customer Orders Client Application for Express REST Service</span>
        <button class="btn btn-light btn-sm btn-margin-right float-right" v-on:click="logout">Log Out</button>
      </header>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    methods: {
      logout() {
        // TODO
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

  header {
    background-color: lightgrey;
    font-size: 1.5em;
    font-weight: bold;
    padding-left: 15px;
    margin-bottom: 15px;
    width: 100%;
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