import { describe, test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import App from "../examples/App.vue"

// Example05 binds @hover on <flexible-table> and reflects the emitted payload into the
// ".last-hovered" element (the item's "c1/c2", or "" when null). Asserting there proves
// the component actually emits "hover" with its payload, not just that native mouseover/
// mouseout events bubble to the DOM.
describe("vue-flexible-table hover", () => {
  test("emits hover with the hovered item", async () => {
    const wrapper = mount(App)
    const rows = wrapper.findAll(".hover-demo .flexibleTable-body .flexibleTable-row")
    expect(rows.length).toBeGreaterThan(0)

    await rows[0].trigger("mouseover")
    expect(wrapper.find(".last-hovered").text()).toBe("Alpha/One")
  })

  test("emits hover again (null) when the mouse leaves a row", async () => {
    const wrapper = mount(App)
    const rows = wrapper.findAll(".hover-demo .flexibleTable-body .flexibleTable-row")

    await rows[0].trigger("mouseover")
    expect(wrapper.find(".last-hovered").text()).toBe("Alpha/One")

    await rows[0].trigger("mouseout")
    expect(wrapper.find(".last-hovered").text()).toBe("")
  })
})
