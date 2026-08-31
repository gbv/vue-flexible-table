import gbv from "eslint-config-gbv"
import vue from "eslint-config-gbv/vue"
import { globalIgnores } from "eslint/config"

export default [
  ...gbv,
  ...vue,
  {
    rules: { "vue/multi-word-component-names": "off" },
  },
  globalIgnores(["examples/app/"]),
]
