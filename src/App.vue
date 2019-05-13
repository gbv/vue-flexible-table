<template>
  <div id="app">
    <flexible-table
      class="table1"
      :fields="fields"
      :items="items" />
     <flexible-table
      :fields="fields"
      :items="items" />
  </div>
</template>

<script>
import FlexibleTable from "./FlexibleTable"

export default {
  name: "app",
  components: { FlexibleTable },
  data () {
    return {
      fields: [
        {
          key: "c1",
          label: "Column 1",
          sortable: true,
          minWidth: "200px",
          align: "center"
        },
        {
          key: "c2",
          label: "Column 2",
          minWidth: "200px"
        }
      ],
      items: [
        {
          c1: "Hello",
          c2: "World",
          _rowClass: "red"
        },
        {
          c1: "What's",
          c2: "up?"
        },
        {
          c1: "What's",
          c2: "up?"
        },
        {
          c1: "What's",
          c2: "up?"
        },
        {
          c1: "What's",
          c2: "up?"
        }
      ]
    }
  }
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
.table1 {
  width: 300px;
  margin: 0 auto;
  overflow: scroll;
}
.red {
  background-color: red;
}
</style>
