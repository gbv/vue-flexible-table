# vue-flexible-table

[![Test and build](https://github.com/gbv/vue-flexible-table/actions/workflows/test-and-build.yml/badge.svg)](https://github.com/gbv/vue-flexible-table/actions/workflows/test-and-build.yml)
[![GitHub package version](https://img.shields.io/github/package-json/v/gbv/vue-flexible-table.svg?label=version)](https://github.com/gbv/vue-flexible-table)
[![NPM package name](https://img.shields.io/badge/npm-vue--flexible--table-blue.svg)](https://www.npmjs.com/package/vue-flexible-table)

A flexible Vue 3 table component.

The motivation to create this table component was to have a table that
- takes up all space that it has available,
- scrolls when available space is not enough,
- resizes its columns dynamically,
- has a fixed head when the body is overflowing vertically,
- synchronizes body and head when scrolling horizontally,
- has custom sorting,
- is used somewhat compatible with [bootstrap-vue's table](https://bootstrap-vue.js.org/docs/components/table).

An example of vue-flexible-table in use can be found [here](https://coli-conc.gbv.de/cocoda/app/?fromScheme=http%3A%2F%2Fbartoc.org%2Fen%2Fnode%2F241&toScheme=http%3A%2F%2Fbartoc.org%2Fen%2Fnode%2F533&from=http%3A%2F%2Fdewey.info%2Fclass%2F612.112%2Fe23%2F&to=http%3A%2F%2Frvk.uni-regensburg.de%2Fnt%2FWW%25208840) (the table in the middle section). For the source of that example, see [here](https://github.com/gbv/cocoda/blob/dev/src/components/MappingBrowser.vue).

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Development](#development)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Install

```bash
npm install vue-flexible-table
```

## Usage

Register the component globally as a plugin in your project's `main.js`. The package ships an idiomatic Vue 3 plugin via its `.install` method, so use it with `app.use`:

```js
import { createApp } from "vue"
import App from "./App.vue"
import FlexibleTable from "vue-flexible-table"

const app = createApp(App)
app.use(FlexibleTable)
app.mount("#app")
```

Or register the component locally in a single-file component using the Options API:

```js
import FlexibleTable from "vue-flexible-table"

export default {
  name: "MyComponent",
  components: { FlexibleTable },
}
```

A minimal example using `<script setup>` and the `fields`/`items` props:

```vue
<script setup>
import FlexibleTable from "vue-flexible-table"

const fields = [
  { key: "c1", label: "Column 1", sortable: true, minWidth: "200px" },
  { key: "c2", label: "Column 2", minWidth: "200px" },
]
const items = [{ c1: "Hello", c2: "World" }]
</script>

<template>
  <flexible-table :fields="fields" :items="items" />
</template>
```

For more usage examples, including custom sections via named slots, please refer to the examples here: https://github.com/gbv/vue-flexible-table/tree/main/src/examples

## Development

Development requires Node.js **22 or later**.

```sh
# Clone repo
git clone https://github.com/gbv/vue-flexible-table.git
# Install dependencies
npm ci
# Start Vite dev server
npm run dev
# Build library
npm run build
```

Please stick to a common coding style:

```
npm run lint    # check coding style
npm run fix     # fix style
```

Tests are split into unit tests and browser tests (e2e). Browser tests are based [on the examples](src/examples/):

```
# Unit tests (only lint coding style)
npm test
# e2e tests (requires to install playwright)
npm run e2e
# build examples and serve them for testing
npm run app
```

## Maintainers

[@nichtich](https://github.com/nichtich)

## Contribute

PRs accepted. Feel free to [open an issue](https://github.com/gbv/vue-flexible-table/issues/new) to ask questions or report problems.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT ©2018 Verbundzentrale des GBV (VZG)
