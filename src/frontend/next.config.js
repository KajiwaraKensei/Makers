// jshint esversion: 9

const path = require("path");
const withCSS = require("@zeit/next-css");
const Dotenv = require("dotenv-webpack");
const withPWA = require("next-pwa");

module.exports = withPWA({
  webpack(config, options) {
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];
    config.node = {
      fs: "empty"
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      "~": path.resolve("./")
    };
    return config;
  }
});
