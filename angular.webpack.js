const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpack = require('webpack');

module.exports = (config, options) => {
  // disable the host check on sandbox
  devServer: {
    disableHostCheck: true
  }
};