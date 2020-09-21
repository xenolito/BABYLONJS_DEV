const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpack = require("webpack");

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

const assetsRules = {
  test: /\.(png|svg|jpg|gif|ico)$/,
  loader: "file-loader",
  options: {
    outputPath: "assets",
    name: "[name].[ext]",
  },
};

module.exports = {
  output: {
    filename: "js/app.[contentHash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [javascriptRules, cssRules, assetsRules],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      title: "Learning Babylonjs Y OLE",
      template: "src/index.html",
    }),
    new MiniCSSExtractPlugin({ filename: "css/style.css" }),
    new webpack.ProvidePlugin({
      Engine: ["@babylonjs/core/Engines/engine", "Engine"],
      Scene: ["@babylonjs/core/scene", "Scene"],
      Vector3: ["@babylonjs/core/Maths/math", "Vector3"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets",
          to: "assets",
        },
      ],
    }),
  ],
};
