const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const glob = require("glob");
const path = require('path');

const mode = 'development';

const entry = glob.sync("./src/pages/**/*.js")
    .reduce((pages, page) => {

      const pageName = page.split('/')[3];

      const pageEntries = Object.assign(pages, {
        [
          pageName === 'home' ? pageName : `${pageName}/${pageName}`
        ]
        : page,
      });

      return pageEntries

    }, {});

const output = {
  filename: '[name].bundle.js?v=[hash]',
  path: path.resolve(__dirname, 'public')
}

const modules = {
  rules: [
    {
      test: /\.styl$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'stylus-loader' }
      ]
    }
  ]
}

const plugins = [
  new HtmlWebpackPlugin({ template: './index.html' })
]

const server = {
  port: 4000
}

const optimization = { }

module.exports = {
  mode: mode,
  entry: entry,
  output: output,
  module: modules,
  plugins: plugins,
  devServer: server,
}
