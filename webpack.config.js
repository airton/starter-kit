const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const glob = require("glob");
const path = require('path');

const mode = 'development';

const entry = () => {
  return glob.sync("./src/pages/**/index.js")
    .reduce((pages, page) => {

      // console.log('pages',pages)
      console.log('page',page)

      const pageName = page.split('/')[3];

      const pageEntries = Object.assign(pages, {
        [
          pageName === 'home' ? pageName : `${pageName}/${pageName}`
        ]
        : page,
      });

      return pageEntries

    }, {});
}

console.log('------pageEntries------')
console.log(entry())

const output = {
  filename: '[name].bundle.js?v=[hash]',
  path: path.resolve(__dirname, 'public')
}

const modules = {
  rules: [
    {
      test: /\.styl$/,
      use: [
        'style-loader',
        'css-loader',
        'stylus-loader'
      ]
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }
  ]
}

const plugins = [
  new HtmlWebpackPlugin({
    template: './index.html'
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  })
]

const server = {
  port: 4000
}

const optimization = { }

const config = {
  mode: mode,
  entry: entry,
  output: output,
  module: modules,
  plugins: plugins,
  devServer: server,
}

module.exports = (env, argv) => {

  // console.log('argv',argv)
  // console.log('env',env)

  if (argv.mode === 'production') {
    //...
  }

  return config;
}
