# vue-flexible-table

[![Test and build](https://github.com/gbv/vue-flexible-table/actions/workflows/test-and-build.yml/badge.svg)](https://github.com/gbv/vue-flexible-table/actions/workflows/test-and-build.yml)
[![GitHub package version](https://img.shields.io/github/package-json/v/gbv/vue-flexible-table.svg?label=version)](https://github.com/gbv/vue-flexible-table)
[![NPM package name](https://img.shields.io/badge/npm-vue--flexible--table-blue.svg)](https://www.npmjs.com/package/vue-flexible-table)

> A flexible table component for Vue.js 2.

This motivation to create this table component was to have a table that
- takes up all space that it has available,
- scrolls when available space is not enough,
- resizes it's columns dynamically,
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

To include the FlexibleTable component globally, add this to your project's `main.js`:

```js
import FlexibleTable from "vue-flexible-table"
Vue.use(FlexibleTable)
```

You can also add it to specific components only:

```js
import FlexibleTable from "vue-flexible-table"
export default {
  // ...
  components: { FlexibleTable },
  // ...
}
```

Both of these methods use the SFC (single-file component) directly, without a build. If you prefer the built version, import it like this:

```js
import FlexibleTable from "vue-flexible-table/style"
import FlexibleTable from "vue-flexible-table/build"
Vue.use(FlexibleTable) // or add to component
```

For usage examples, please refer to the examples here: https://github.com/gbv/vue-flexible-table/tree/master/src/examples

## Development
Development requires Node.js 18 or later.

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

## Maintainers

[@stefandesu](https://github.com/stefandesu)

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT ©2018 Verbundzentrale des GBV (VZG)
