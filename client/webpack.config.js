const { resolve } = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const JavaScriptObfuscator = require("webpack-obfuscator");

const isProd = process.env.NODE_ENV === "production";

const config = {
  mode: isProd ? "production" : "development",
  entry: {
    index: "./src/index.tsx"
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  resolve: {
    extensions: [
      ".jsx",
      ".js",
      ".tsx",
      ".ts",
      ".json",
      ".css",
      ".scss",
      ".atlas"
    ]
  },
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)?$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|apng|webp|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "assets",
            name: "[name].[ext]",
            useRelativePath: true
          }
        }
      },
      {
        test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "assets/fonts",
            name: "[name].[ext]",
            useRelativePath: true
          }
        }
      },
      {
        test: /\.(txt)$/i,
        use: "raw-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      PIXI: "pixi.js"
    }),
    new CopyWebpackPlugin([
      {
        from: "src/assets",
        to: "assets"
      },
      { from: "src/styles", to: "styles" }
    ]),
    new HtmlWebpackPlugin({
      title: "CMPS3640-Bomberman",
      template: "src/index.html"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery"
    }),
    new JavaScriptObfuscator(
      {
        rotateUnicodeArray: true
      },
      ["excluded_bundle_name.js"]
    )
  ]
};

if (isProd) {
  config.optimization = {
    minimizer: [new TerserWebpackPlugin()]
  };
} else {
  config.devServer = {
    port: 8080, // https://webpack.js.org/configuration/dev-server/#devserverport
    open: true, // https://webpack.js.org/configuration/dev-server/#devserveropen
    hot: true, // https://webpack.js.org/configuration/dev-server/#devserverhot
    compress: true, // https://webpack.js.org/configuration/dev-server/#devservercompress
    stats: "errors-only", // https://webpack.js.org/configuration/dev-server/#devserverstats-
    overlay: true // https://webpack.js.org/configuration/dev-server/#devserveroverlay
  };
}

module.exports = config;
