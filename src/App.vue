<template>
  <div id="app">
    <h1>vue-flexible-table</h1>
    <a href="https://github.com/stefandesu/vue-flexible-table">https://github.com/stefandesu/vue-flexible-table</a>
    <h2>Examples:</h2>
    <h3>Simple table with fixed with</h3>
    <example-01 />
    <h3>Simple table with 100% width (default) and a rowClass</h3>
    <example-02 />
  </div>
</template>

<script>
import Example01 from "./Example01"
import Example02 from "./Example02"

export default {
  name: "App",
  components: {
    Example01,
    Example02,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
