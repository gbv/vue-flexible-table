import FlexibleTable from "./FlexibleTable.vue"

// Install method so that it can be used as a plugin with `app.use(FlexibleTable)`.
FlexibleTable.install = (app) => {
  app.component(FlexibleTable.name, FlexibleTable)
}

export default FlexibleTable
