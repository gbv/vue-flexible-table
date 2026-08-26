<template>
  <flexible-table
    :fields="fields"
    :sections="sections">
    <template #BEFORE_SECTION="{ section }">
      Before <b>{{ section.name }}</b>
    </template>
    <template #AFTER_SECTION="{ section }">
      After <b>{{ section.name }}</b>
    </template>
  </flexible-table>
</template>

<script>
import FlexibleTable from "vue-flexible-table"

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
        {
          name: "Third, empty section, with class",
          items: [],
          _class: "custom-section-class",
        },
      ],
    }
  },
}
</script>

<style>
.custom-section-class > .flexibleTable-section-before {
  background-color: lightgrey;
}
</style>
