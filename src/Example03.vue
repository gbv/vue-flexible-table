<template>
  <flexible-table
    :fields="fields"
    :sections="sections">
    <span
      slot="BEFORE_SECTION"
      slot-scope="{ section }">
      Before <b>{{ section.name }}</b>
    </span>
    <span
      slot="AFTER_SECTION"
      slot-scope="{ section }">
      After <b>{{ section.name }}</b>
    </span>
  </flexible-table>
</template>

<script>
import FlexibleTable from "./FlexibleTable"

export default {
  name: "Example02",
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
      sections: [
        {
          name: "First Section",
          items: [
            {
              c1: "Hello",
              c2: "World",
            },
            {
              c1: "What's",
              c2: "up?",
            },
          ],
        },
        {
          name: "Second Section",
          items: [
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
        },
      ],
    }
  },
}
</script>

<style>
</style>
