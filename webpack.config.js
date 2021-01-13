const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const RemoveConsolePlugin = require("remove-console-plugin");

const webpack = require("webpack");

const javascriptRules = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
      plugins: ["@babel/plugin-proposal-optional-chaining"],
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
  entry: {
    app: ["babel-polyfill", "./src/index.js"],
  },
  output: {
    filename: "js/app.[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [javascriptRules, cssRules, assetsRules],
  },
  devServer: {
    //port: 6666,
    //hot: true,
    //compress: true,
  },
  plugins: [
    new RemoveConsolePlugin({
      remove: ["log"],
    }),
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
      Matrix: ["@babylonjs/core/Maths/math", "Matrix"],
      Quaternion: ["@babylonjs/core/Maths/math", "Quaternion"],
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

console.log("IS DEVSERVER? ===> " + process.env.WEBPACK_DEV_SERVER);

if (process.env.WEBPACK_DEV_SERVER) {
  module.exports.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      analyzerPort: 4000,
      openAnalyzer: false,
      defaultSizes: "gzip",
    })
  );
}

//import { Matrix, Vector3, Quaternion } from "../Maths/math.vector";
