module.exports = {
  "root": true,
  "env": {
    "node": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/recommended",
  ],
  "rules": {
    "no-console": "off",
    "no-debugger": "off",
    "no-undef": "off",
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1,
      },
    ],
    "linebreak-style": [
      "error",
      "unix",
    ],
    "quotes": [
      "error",
      "double",
    ],
    "vue/no-v-html": "off",
    "vue/html-closing-bracket-newline": [
      "error",
      {
        "singleline": "never",
        "multiline": "never",
      },
    ],
    "vue/html-closing-bracket-spacing": [
      "error",
      {
        "startTag": "never",
        "endTag": "never",
        "selfClosingTag": "always",
      },
    ],
    "comma-dangle": ["error", "always-multiline"],
  },
  "parserOptions": {
    "sourceType": "module",
    "parser": "babel-eslint",
  },
}
