module.exports = {
  devServer: {
    host: "localhost",
    port: 8088,
    useLocalIp: false,
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  publicPath: "./",
  chainWebpack: config => {
    // from: https://stackoverflow.com/questions/51304187/spaces-are-gone-in-html-after-upgrading-to-vue-cli-3
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
  },
}
