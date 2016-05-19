module.exports = {
  entry: "./src/main.js",

  output: {
    path: "./build/",
    publicPath: "./build/",
    filename: "build.js"
  },
  module: {
    loaders: [
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.vue$/, loader: "vue-loader" },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
    ]
  }
}