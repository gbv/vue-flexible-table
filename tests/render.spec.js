import { test, expect } from "@playwright/test"

test.describe("vue-flexible-table rendering", () => {
  test("renders column headers", async ({ page }) => {
    await page.goto("/")
    const headers = page.locator(".flexibleTable-head .flexibleTable-cell")
    await expect(headers.first()).toBeVisible()
    await expect(headers).toContainText(["Column 1", "Column 2"])
  })

  test("renders one row per item with the raw cell content", async ({ page }) => {
    await page.goto("/")
    // The first table on the page is Example01, which has five items.
    const table = page.locator(".flexibleTable").first()
    const rows = table.locator(".flexibleTable-body .flexibleTable-row")
    await expect(rows).toHaveCount(5)
    const cells = table.locator(".flexibleTable-body .flexibleTable-cell")
    await expect(cells.first()).toContainText("Hello")
    await expect(cells.nth(1)).toContainText("World")
  })

  test("applies the _rowClass of an item (Example02)", async ({ page }) => {
    await page.goto("/")
    const redCell = page.locator(".flexibleTable-cell.red").first()
    await expect(redCell).toBeVisible()
  })

  test("renders a fixed-height table with a sticky header (Example04)", async ({ page }) => {
    await page.goto("/")
    // Example04 sets an explicit height on its .table1 wrapper (Example01 does not).
    const heights = await page.locator(".table1").evaluateAll((els) => els.map((el) => getComputedStyle(el).height))
    expect(heights).toContain("200px")
  })

  test("renders custom BEFORE_SECTION / AFTER_SECTION slots (Example03)", async ({ page }) => {
    await page.goto("/")
    const before = page.locator(".flexibleTable-section-before")
    const after = page.locator(".flexibleTable-section-after")
    await expect(before).toContainText(["Before First Section", "Before Second Section"])
    await expect(after).toContainText(["After First Section", "After Second Section"])
  })

  test("renders an empty section that still shows its slots and custom class (Example03)", async ({ page }) => {
    await page.goto("/")
    const emptySection = page.locator(".custom-section-class")
    await expect(emptySection).toHaveCount(1)
    await expect(emptySection).toContainText("Before Third, empty section, with class")
    await expect(emptySection).toContainText("After Third, empty section, with class")
  })
})
