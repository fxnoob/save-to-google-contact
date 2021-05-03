const webpack = require("webpack");
const { ESBuildPlugin, ESBuildMinifyPlugin } = require("esbuild-loader");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
const { manifestTransform } = require("./scripts/transform");

module.exports = (env, options) => {
  return {
    mode: "production",
    entry: {
      content_script: "./src/content-scripts/index.js",
      background: "./src/background.js",
      popup: "./src/popup-page/index.js",
      option: "./src/option-page/index.js",
    },
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: { loader: "worker-loader" },
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "esbuild-loader",
              options: {
                loader: "jsx",
                target: "es2015",
              },
            },
            "eslint-loader",
          ],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader?modules"],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            "file-loader",
            {
              loader: "image-webpack-loader",
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true, // webpack@2.x and newer
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: options.mode == "production",
      minimizer: [new ESBuildMinifyPlugin()],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".json"],
    },
    output: {
      path: __dirname + "/dist",
      publicPath: "/",
      filename: "[name].bundle.js",
    },
    devtool: "inline-sourcemap",
    plugins: [
      new ESBuildPlugin(),
      new CopyWebpackPlugin(
        [
          { from: "./src/popup-page/popup.html", force: true },
          { from: "./src/option-page/option.html", force: true },
          { from: "./src/app/", force: true },
        ],
        {}
      ),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(dotenv.parsed),
      }),
      new CopyWebpackPlugin([
        {
          from: "./src/app/manifest.json",
          force: true,
          transform(content, path) {
            return manifestTransform(content, path, options);
          },
        },
      ]),
      new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
      contentBase: "./dist",
      hot: true,
    },
  };
};
