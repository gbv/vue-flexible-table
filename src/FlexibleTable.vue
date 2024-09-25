<template>
  <div
    :style="tableStyle()"
    class="flexibleTable">
    <!-- Head -->
    <div class="flexibleTable-head">
      <!-- Just one row in head -->
      <div
        v-if="!hideHeader"
        class="flexibleTable-row">
        <div
          v-for="field in fields"
          :key="'HEAD_' + field.key"
          :style="cellStyle(field)"
          :class="{
            [field.class]: true,
            'flexibleTable-cell': true,
            ['flexibleTable-cell-' + (field.align || defaultAlign)]: true,
            'flexibleTable-sortable': field.sortable
          }"
          @click="field.sortable && sort(field)">
          <!-- Slot for head cell content. Override with <template slot="HEAD_key" slot-scope="{ field }"> -->
          <slot
            :name="'HEAD_' + field.key"
            :field="field">
            <span :class="field.titleClass">
              {{ fieldLabel(field) }}
            </span>
            <span
              class="flexibleTable-cell-sort">
              <!--
                SVG icon by FontAwesome
                URL: https://fontawesome.com/icons/sort-up?style=solid
                License: https://fontawesome.com/license/free
               -->
              <svg
                v-if="sorting.sortBy == field.key && sorting.sortDirection == 1"
                width="10px"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -60 320 512">
                <path
                  fill="currentColor"
                  d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z" />
              </svg>
              <!--
                SVG icon by FontAwesome
                URL: https://fontawesome.com/icons/sort-down?style=solid
                License: https://fontawesome.com/license/free
               -->
              <svg
                v-else-if="sorting.sortBy == field.key && sorting.sortDirection == -1"
                width="10px"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -60 320 512">
                <path
                  fill="currentColor"
                  d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z" />
              </svg>
              <!--
                SVG icon by FontAwesome
                URL: https://fontawesome.com/icons/sort?style=solid
                License: https://fontawesome.com/license/free
               -->
              <svg
                v-else-if="field.sortable"
                width="10px"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -60 320 512">
                <path
                  fill="currentColor"
                  d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z" />
              </svg>
            </span>
          </slot>
        </div>
      </div>
    </div>
    <!-- Body -->
    <div class="flexibleTable-body">
      <!-- Sections -->
      <div
        v-for="(section, section_index) in _sections"
        :key="`SECTION_${section_index}`"
        class="flexibleTable-section"
        :class="{
          [section._class]: section._class != null
        }">
        <!-- BEFORE_SECTION slot -->
        <div
          v-if="hasSlot('BEFORE_SECTION')"
          class="flexibleTable-section-before">
          <slot
            name="BEFORE_SECTION"
            :section="section" />
        </div>
        <div class="flexibleTable-rows">
          <!-- One row for each item -->
          <div
            v-for="(item, item_index) in sorted(section.items)"
            :key="`SECTION_${section_index}_ITEM_${item_index}`"
            @mouseover="$emit('hover', item)"
            @mouseout="$emit('hover', null)">
            <!-- Special case to use a whole row for an item -->
            <div
              v-if="item._wholeRow"
              class="flexibleTable-row">
              <div
                style="flex: 0 0 100%;"
                :class="{
                  'flexibleTable-cell': true,
                  ['flexibleTable-cell-' + (item.align || defaultAlign)]: true,
                  [item._rowClass]: item._rowClass != null
                }">
                <!-- Slot for whole row. Override with <template slot="ITEM_ROW" slot-scope="{ item, value }"> -->
                <slot
                  :name="'ITEM_ROW'"
                  :item="item"
                  :value="item.value">
                  {{ item.value }}
                </slot>
              </div>
            </div>
            <!-- Normal case to display cells according to "section.fields" -->
            <div
              v-else
              class="flexibleTable-row">
              <div
                v-for="field in section.fields"
                :key="`SECTION_${section_index}_ITEM_${item_index}_FIELD_${field.key}`"
                :style="cellStyle(field)"
                :class="{
                  [field.class]: field.class != null,
                  'flexibleTable-cell': true,
                  ['flexibleTable-cell-' + (field.align || defaultAlign)]: true,
                  [item._rowClass]: item._rowClass != null
                }">
                <!-- Slot for cell content. Override with <template slot="key" slot-scope="{ field, item, value }"> -->
                <slot
                  :name="field.key"
                  :field="field"
                  :item="item"
                  :value="item[field.key]">
                  {{ defaultCellContent(item[field.key]) }}
                </slot>
              </div>
            </div>
          </div>
        </div>
        <!-- AFTER_SECTION slot -->
        <div
          v-if="hasSlot('AFTER_SECTION')"
          class="flexibleTable-section-after">
          <slot
            name="AFTER_SECTION"
            :section="section" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Component that displays a flexible table. Usage is similar to that of [bootstrap-vue tables](https://bootstrap-vue.js.org/docs/components/table).
 */
export default {
  name: "FlexibleTable",
  props: {
    /**
     * An array of field objects with the following properties:
     *
     * - `key`: key for the field/column (required)
     * - `label`: label for the column (optional, defaults to key with capitalized first letter)
     * - `class`: class name for the cell (optional)
     * - `titleClass`: class name for the title of the cell (optional)
     * - `align`: alignment of the cell (optional, default center)
     * - `width`: CSS width of the column (optional)
     * - `minWidth`: CSS minWidth of the column (optional)
     * - `sortable`: true if this field should be sortable (optional, default false)
     * - `compare`: custom compare function for sorting this field (optional)
     */
    fields: {
      type: Array,
      default: () => [],
    },
    /**
     * An array if items to be shown in the table.
     * By default, the raw content under the field keys are shown.
     * Use slots for a custom appearance.
     *
     * Additional keys (optional):
     *
     * - `_rowClass`: class for the row
     * - `_wholeRow`: boolean whether the item will be displayed as a whole row (uses key `value`, but better used with slots)
     */
    items: {
      type: Array,
      default: () => [],
    },
    /**
     * An optional array of section objects with the following properties:
     *
     * - `items`: items for section (required, see global `items` prop)
     * - `fields`: fields for section (optional, fallback to global `fields` prop)
     *
     * If `sections` is given, `items` will be ignored.
     */
    sections: {
      type: Array,
      default: null,
    },
    /**
     * Maximum width of the whole table.
     */
    maxWidth: {
      type: String,
      default: "100%",
    },
    /**
     * Maximum height of the whole table.
     */
    maxHeight: {
      type: String,
      default: "100%",
    },
    /**
     * Key to sort table by (overridden by user choice).
     */
    sortBy: {
      type: String,
      default: null,
    },
    /**
     * Direction to sort table by (overridden by user choice).
     *
     * `0` - no sorting,
     * `1` - ascending,
     * `-1` - descending
     */
    sortDirection: {
      type: Number,
      default: 1,
    },
    /**
     * Option to hide the table header.
     */
    hideHeader: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      // Contains the current sorting preferences.
      sorting: {
        sortBy: null,
        sortDirection: 0,
      },
      // Contains the default alignment
      defaultAlign: "center",
    }
  },
  computed: {
    /**
     * Computes a sections array where each object has a `items` and `fields` property.
     */
    _sections () {
      if (!this.sections) {
        return [
          {
            items: this.items,
            fields: this.fields,
          },
        ]
      }
      let sections = this.sections.map(section => Object.assign({ fields: this.fields, items: [] }, section))
      return sections
    },
  },
  mounted () {
    // Set initial sorting preferences
    this.sorting.sortBy = this.sortBy
    this.sorting.sortDirection = this.sortDirection
    // Prepare table
    let table = this.$el
    let thead = table.getElementsByClassName("flexibleTable-head")[0]
    let tbody = table.getElementsByClassName("flexibleTable-body")[0]
    // Synchronize head and body
    tbody.onscroll = () => {
      thead.scrollLeft = tbody.scrollLeft
    }
    thead.onscroll = () => {
      tbody.scrollLeft = thead.scrollLeft
    }
    // Account for vertical scroll bar
    if (tbody.scrollHeight > tbody.clientHeight) {
      thead.style.marginRight = "9px"
    } else {
      thead.style.marginRight = "0px"
    }
  },
  methods: {
    /**
     * Style object for the whole table.
     */
    tableStyle () {
      return {
        maxWidth: this.maxWidth,
        maxHeight: this.maxHeight,
      }
    },
    /**
     * Style object for each cell.
     */
    cellStyle (field) {
      let style = {}
      if (field.width != null) {
        style.flex = `1 0 ${field.width}`
      }
      if (field.minWidth != null) {
        style.minWidth = `${field.minWidth}`
      }
      return style
    },
    /**
     * Get label of a field, optionally derived from field key.
     */
    fieldLabel (field) {
      if (field.label || field.label === "") {
        return field.label
      } else {
        // convert multipleWordKEYS into "Multiple Word KEYS"
        let label = field.key.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")
        return label[0].toUpperCase() + label.substring(1)
      }
    },
    /**
     * Determines default table cell content.
     * Objects and arrays won't be displayed.
     */
    defaultCellContent (value) {
      if (typeof value === "object" && value != null) {
        return value.id || value._id || value.uri || "Object"
      } else {
        return value
      }
    },
    /**
     * Sets the sorting preferences.
     */
    sort (field) {
      if (this.sorting.sortBy === field.key) {
        if (this.sorting.sortDirection === 0) {
          this.sorting.sortDirection = 1
        } else if (this.sorting.sortDirection === 1) {
          this.sorting.sortDirection = -1
        } else {
          this.sorting.sortDirection = 0
        }
      } else {
        this.sorting.sortBy = field.key
        this.sorting.sortDirection = 1
      }
    },
    /**
     * Returns a sorted list of items according to the current sorting preferences.
     */
    sorted (items) {
      let sortBy = this.sorting.sortBy
      if (this.sorting.sortDirection === 0 || !sortBy) {
        return items
      }
      items = items.slice()
      let sortField = this.fields.find(f => f.key === sortBy)
      let compare = (sortField && sortField.compare) || ((a, b) => {
        let valueA = a[sortBy]; let valueB = b[sortBy]
        if (valueA == null || valueA < valueB) {
          return -1
        }
        if (valueB == null || valueA > valueB) {
          return 1
        }
        return 0
      })
      items.sort(compare)
      if (this.sorting.sortDirection === -1) {
        items = items.reverse()
      }
      return items
    },
    // from: https://forum.vuejs.org/t/check-if-components-slot-is-empty/6015/6
    hasSlot (name = "default") {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    },
  },
}
</script>

<style scoped>
.flexibleTable {
  display: flex;
  flex-direction: column;
}
.flexibleTable-head {
  flex: none;
  overflow: auto;
  font-weight: 700;
}
.flexibleTable-body {
  flex: 1;
  overflow: auto;
}
.flexibleTable-row {
  display: flex;
}
/* Cell styles */
.flexibleTable-cell {
  overflow: hidden;
  flex: 1;
}
.flexibleTable-cell-center {
  padding: 4px 2px;
  text-align: center;
}
.flexibleTable-cell-left {
  padding: 4px 6px;
  text-align: left;
}
.flexibleTable-cell-right {
  padding: 4px 6px;
  text-align: right;
}
.flexibleTable-head .flexibleTable-cell {
  user-select: none;
  border-bottom: 1px solid rgba(0,0,0,0.4);
}
.flexibleTable-head .flexibleTable-cell.flexibleTable-sortable {
  cursor: pointer;
}
.flexibleTable-head .flexibleTable-cell.flexibleTable-sortable:hover {
  color: rgba(0,0,0,0.5);
}
.flexibleTable-body .flexibleTable-cell {
  border-bottom: 1px solid rgba(0,0,0,0.1);
  position: relative;
}
.flexibleTable-body .flexibleTable-rows > div:last-child .flexibleTable-cell {
  border-bottom: none;
}
.flexibleTable-section {
  border-bottom: 1px solid rgba(0,0,0,0.4);
}
.flexibleTable-section-before {
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding: 3px 0;
}
.flexibleTable-section-after {
  border-top: 1px solid rgba(0,0,0,0.1);
  padding: 3px 0;
}
.flexibleTable-body .flexibleTable-row:hover .flexibleTable-cell {
  /* FIXME: This overrides custom background colors. */
  background-color: rgba(0,0,0,0.1);
}
.flexibleTable-cell-sort {
  margin-left: 2px;
}
/* Hide scrollbars in head */
.flexibleTable-head {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.flexibleTable-head::-webkit-scrollbar {
  display: none;
}
</style>
