import { test, expect } from "@playwright/test"

// Example05 binds @hover on <flexible-table> and reflects the emitted payload into the
// ".last-hovered" element (the item's "c1/c2", or "" when null). Asserting there proves
// the component actually emits "hover" with its payload, not just that native mouseover/
// mouseout events bubble to the DOM.
test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test("emits hover with the hovered item", async ({ page }) => {
  const rows = page.locator(".hover-demo .flexibleTable-body .flexibleTable-row")
  await expect(rows.first()).toBeVisible()
  await rows.first().hover()
  // Example05's first row carries item { c1: "Alpha", c2: "One" }.
  await expect(page.locator(".last-hovered")).toHaveText("Alpha/One")
})

test("emits hover again (null) when the mouse leaves a row", async ({ page }) => {
  const rows = page.locator(".hover-demo .flexibleTable-body .flexibleTable-row")
  await rows.first().hover()
  await expect(page.locator(".last-hovered")).toHaveText("Alpha/One")
  // Move the cursor onto a non-row element (the app heading) so the row fires mouseout.
  await page.locator("#app h1").hover()
  await expect(page.locator(".last-hovered")).toHaveText("")
})
