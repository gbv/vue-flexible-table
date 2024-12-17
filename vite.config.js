import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue2"
import { resolve } from "path"

/**
 * Allow two different builds:
 * - `npm run build` builds the library
 * - `BUILD_MODE=app npm run build` builds the app (App.vue)
 *
 * Note that the destination folder `dist` will be emptied before each build.
 */
let build
if (process.env.BUILD_MODE !== "app") {
  build = {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
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
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        whitespace: "preserve",
      },
    },
  })],
  build,
})
