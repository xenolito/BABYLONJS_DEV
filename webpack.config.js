const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

const javascriptRules = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
    },
  },
};

const cssRules = {
  /*test: /\.s[ac]ss$/i,*/
  test: /\.scss$/,
  exclude: /node_modules/,
  use: [
    {
      loader: MiniCSSExtractPlugin.loader,
    },
    "css-loader",
    "sass-loader",
  ],
};

module.exports = {
  output: {
    filename: "js/app.[contentHash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [javascriptRules, cssRules],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      title: "Learning Babylonjs Y OLE",
      template: "src/index.html",
    }),
    new MiniCSSExtractPlugin({ filename: "css/style.css" }),
  ],
};
