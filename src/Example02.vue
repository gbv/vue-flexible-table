<template>
  <flexible-table
    :fields="fields"
    :items="items" />
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
          align: "center",
        },
        {
          key: "c2",
          label: "Column 2",
          minWidth: "200px",
        },
      ],
      items: [
        {
          c1: "Hello",
          c2: "World",
          _rowClass: "red",
        },
        {
          c1: "What's",
          c2: "up?",
        },
        {
          c1: "What's",
          c2: "up?",
        },
        {
          c1: "What's",
          c2: "up?",
        },
        {
          c1: "What's",
          c2: "up?",
        },
      ],
    }
  },
}
</script>

<style>
.red {
  background-color: red;
}
</style>
