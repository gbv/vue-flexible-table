import { describe, test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import App from "../src/App.vue"

// Example02 is the only table carrying a ".red" cell, so it uniquely identifies the
// sortable table used here. Its c1 column holds "Hello" followed by four "What's".
describe("vue-flexible-table sorting", () => {
  test("reorders rows when a sortable header is clicked twice (descending)", async () => {
    const wrapper = mount(App)
    const tables = wrapper.findAll(".flexibleTable")
    const table = tables.find(t => t.find(".red").exists())
    expect(table).toBeDefined()

    const headers = table.findAll(".flexibleTable-head .flexibleTable-cell")
    const header = headers.find(h => h.text().includes("Column 1"))
    expect(header).toBeDefined()

    const firstC1 = () => table.findAll(".flexibleTable-body .flexibleTable-row")[0].findAll(".flexibleTable-cell")[0].text().trim()
    const lastC1 = () => {
      const rows = table.findAll(".flexibleTable-body .flexibleTable-row")
      return rows[rows.length - 1].findAll(".flexibleTable-cell")[0].text().trim()
    }

    expect(firstC1()).toBe("Hello")
    await header.trigger("click")
    await header.trigger("click")
    expect(firstC1()).toBe("What's")
    expect(lastC1()).toBe("Hello")
  })

  test("restores the original order after a third click", async () => {
    const wrapper = mount(App)
    const tables = wrapper.findAll(".flexibleTable")
    const table = tables.find(t => t.find(".red").exists())
    const headers = table.findAll(".flexibleTable-head .flexibleTable-cell")
    const header = headers.find(h => h.text().includes("Column 1"))

    const firstC1 = () => table.findAll(".flexibleTable-body .flexibleTable-row")[0].findAll(".flexibleTable-cell")[0].text().trim()

    await header.trigger("click")
    await header.trigger("click")
    await header.trigger("click")
    expect(firstC1()).toBe("Hello")
  })
})
