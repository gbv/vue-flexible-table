import { test, expect } from "@playwright/test"

// Example02 is the only table carrying a ".red" cell, so it uniquely identifies the
// sortable table used here. Its c1 column holds "Hello" followed by four "What's".
test.describe("vue-flexible-table sorting", () => {
  test("reorders rows when a sortable header is clicked twice (descending)", async ({ page }) => {
    await page.goto("/")
    const table = page.locator(".flexibleTable").filter({ has: page.locator(".red") })
    const header = table.locator(".flexibleTable-head .flexibleTable-cell").filter({ hasText: "Column 1" })
    const firstC1 = () => table.locator(".flexibleTable-body .flexibleTable-row").first().locator(".flexibleTable-cell").first()

    await expect(firstC1()).toHaveText("Hello")
    await header.click()
    await header.click()
    await expect(firstC1()).toHaveText("What's")
    await expect(table.locator(".flexibleTable-body .flexibleTable-row").last().locator(".flexibleTable-cell").first()).toHaveText("Hello")
  })

  test("restores the original order after a third click", async ({ page }) => {
    await page.goto("/")
    const table = page.locator(".flexibleTable").filter({ has: page.locator(".red") })
    const header = table.locator(".flexibleTable-head .flexibleTable-cell").filter({ hasText: "Column 1" })
    const firstC1 = () => table.locator(".flexibleTable-body .flexibleTable-row").first().locator(".flexibleTable-cell").first()

    await header.click()
    await header.click()
    await header.click()
    await expect(firstC1()).toHaveText("Hello")
  })
})
