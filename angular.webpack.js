/**
 * Custom angular webpack configuration
 */
module.exports = (config, options) => {
  // disable the host check on sandbox
  devServer: {
    disableHostCheck: true
  }
};