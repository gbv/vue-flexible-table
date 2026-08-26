import { defineConfig } from "@playwright/test"

// End-to-end tests for the vue-flexible-table component. The suite exercises the
// production build of the demo app: `npm run build-app` writes dist/index.html and
// `vite preview` serves it, so the tests run against exactly what gets shipped.
export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: process.env.CI !== undefined,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run build-app && npx vite preview --port 4173",
    url: "http://localhost:4173",
    reuseExistingServer: false,
    timeout: 60000,
  },
})
