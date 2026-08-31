import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

let build = {
  lib: {
    entry: resolve(import.meta.dirname, "index.js"),
    name: "VueFlexibleTable",
    cssFileName: "style",
  },
  rollupOptions: {
    external: ["vue"],
    output: {
      globals: {
        vue: "Vue",
      },
    },
  },
}

// `BUILD_MODE=app npm run build` builds the demo app (App.vue)
if (process.env.BUILD_MODE === "app") {
  build = {
    outDir: "examples/app",
    base: "",
  }
}

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        whitespace: "preserve",
      },
    },
  })],
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      provider: "v8",
    },
  },
  build,
  base: "./",
})
