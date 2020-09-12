const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { manifestTransform } = require("./scripts/transform");

module.exports = {
  entry: {
    background: "./src/background.js",
    option: "./src/option-page/App.jsx",
    popup: "./src/popup-page/App.jsx",
    content_script: "./src/content-scripts/App.jsx"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.iframe.css$/,
        use: [{ loader: "file-loader" }, { loader: "postcss-loader" }]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".css", ".json"]
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "[name].bundle.js"
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        { from: "./src/option-page/option.html", force: true },
        { from: "./src/popup-page/popup.html", force: true },
        { from: "./src/app/", force: true }
      ],
      {}
    ),
    new CopyWebpackPlugin([
      {
        from: "./src/app/manifest.json",
        force: true,
        transform(content, path) {
          return manifestTransform(content, path, options);
        }
      }
    ]),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./dist",
    hot: true
  }
};
