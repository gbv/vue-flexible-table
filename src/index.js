import FlexibleTable from "./FlexibleTable.vue"

FlexibleTable.install = (vue) => {
  vue.component(FlexibleTable.name, FlexibleTable)
}

// Install method so that it can be used as a plugin.
export const install = (vue) => {
  vue.use(FlexibleTable)
}

export default FlexibleTable
