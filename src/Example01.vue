<template>
  <flexible-table
    class="table1"
    :fields="fields"
    :items="items" />
</template>

<script>
import FlexibleTable from "./FlexibleTable.vue"

export default {
  name: "Example01",
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
.table1 {
  width: 300px;
  margin: 0 auto;
  overflow: scroll;
}
</style>
