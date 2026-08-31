<template>
  <div class="hover-demo">
    <flexible-table
      class="tableHover"
      :fields="fields"
      :items="items"
      @hover="onHover" />
    <div class="last-hovered">
      {{ lastHovered }}
    </div>
  </div>
</template>

<script>
import FlexibleTable from "vue-flexible-table"

export default {
  name: "Example05",
  components: { FlexibleTable },
  data () {
    return {
      fields: [
        {
          key: "c1",
          label: "Column 1",
          sortable: true,
          minWidth: "200px",
        },
        {
          key: "c2",
          label: "Column 2",
          minWidth: "200px",
        },
      ],
      items: [
        {
          c1: "Alpha",
          c2: "One",
        },
        {
          c1: "Beta",
          c2: "Two",
        },
        {
          c1: "Gamma",
          c2: "Three",
        },
      ],
      lastHovered: "",
    }
  },
  methods: {
    onHover (item) {
      this.lastHovered = item ? `${item.c1}/${item.c2}` : ""
    },
  },
}
</script>

<style>
.hover-demo {
  width: 300px;
  margin: 0 auto;
}
.last-hovered {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}
</style>
