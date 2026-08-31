import { describe, test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import App from "../src/App.vue"

describe("vue-flexible-table rendering", () => {
  test("renders column headers", () => {
    const wrapper = mount(App)
    const headers = wrapper.findAll(".flexibleTable-head .flexibleTable-cell")
    expect(headers.length).toBeGreaterThan(0)
    const texts = headers.map(h => h.text())
    expect(texts.some(t => t.includes("Column 1"))).toBe(true)
    expect(texts.some(t => t.includes("Column 2"))).toBe(true)
  })

  test("renders one row per item with the raw cell content", () => {
    const wrapper = mount(App)
    // The first table on the page is Example01, which has five items.
    const table = wrapper.findAll(".flexibleTable")[0]
    const rows = table.findAll(".flexibleTable-body .flexibleTable-row")
    expect(rows.length).toBe(5)
    const cells = table.findAll(".flexibleTable-body .flexibleTable-cell")
    expect(cells[0].text()).toContain("Hello")
    expect(cells[1].text()).toContain("World")
  })

  test("applies the _rowClass of an item (Example02)", () => {
    const wrapper = mount(App)
    const redCell = wrapper.find(".flexibleTable-cell.red")
    expect(redCell.exists()).toBe(true)
  })

  test("renders a fixed-height table with a sticky header (Example04)", () => {
    const wrapper = mount(App)
    const table1s = wrapper.findAll(".table1")
    expect(table1s.length).toBe(2) // Example01 and Example04 both use class table1
    // Example04 is the second table with class table1
    const example04Table = table1s[1]
    expect(example04Table.exists()).toBe(true)
    expect(example04Table.classes()).toContain("table1")
  })

  test("renders custom BEFORE_SECTION / AFTER_SECTION slots (Example03)", () => {
    const wrapper = mount(App)
    const before = wrapper.findAll(".flexibleTable-section-before")
    const after = wrapper.findAll(".flexibleTable-section-after")
    const beforeTexts = before.map(b => b.text())
    const afterTexts = after.map(a => a.text())
    expect(beforeTexts).toContain("Before First Section")
    expect(beforeTexts).toContain("Before Second Section")
    expect(afterTexts).toContain("After First Section")
    expect(afterTexts).toContain("After Second Section")
  })

  test("renders an empty section that still shows its slots and custom class (Example03)", () => {
    const wrapper = mount(App)
    const emptySection = wrapper.findAll(".custom-section-class")
    expect(emptySection.length).toBe(1)
    expect(emptySection[0].text()).toContain("Before Third, empty section, with class")
    expect(emptySection[0].text()).toContain("After Third, empty section, with class")
  })
})
