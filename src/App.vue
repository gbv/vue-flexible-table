<template>
  <div id="app">
    <h1>vue-flexible-table</h1>
    <a href="https://github.com/gbv/vue-flexible-table">https://github.com/gbv/vue-flexible-table</a>
    <h2>Examples:</h2>
    <h3>Simple table with fixed width</h3>
    <example-01 />
    <h3>Simple table with 100% width (default) and a rowClass</h3>
    <example-02 />
    <h3>Table with sections</h3>
    <example-03 />
    <h3>Table with fixed width and height (demonstrates sticky header)</h3>
    <example-04 />
  </div>
</template>

<script>
import Example01 from "./examples/Example01.vue"
import Example02 from "./examples/Example02.vue"
import Example03 from "./examples/Example03.vue"
import Example04 from "./examples/Example04.vue"

export default {
  name: "App",
  components: {
    Example01,
    Example02,
    Example03,
    Example04,
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
