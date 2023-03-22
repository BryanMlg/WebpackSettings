const Path = require("path");
const HtmlWebpack = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpack = require("copy-webpack-plugin");
const DotEnv = require("dotenv-webpack");
import("webpack").Configuration;


module.exports = {
  entry: "./src/index.js",
  output: {
    path: Path.resolve(__dirname, "dist"),
    filename: "index.js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
    clean: true,
  },
  mode:"development",
  devtool:false,
  resolve: {
    extensions: [".js"],
    alias:{
      "@utils":Path.resolve(__dirname,"src/utils"),
      "@templates":Path.resolve(__dirname,"src/templates"),
      "@styles":Path.resolve(__dirname,"src/styles"),
      "@images":Path.resolve(__dirname,"src/assets/images"),
    },
  },


  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css|.scss|.sass/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2)$/i, // Tipos de fuentes a incluir
        type: "asset/resource", // Tipo de módulo a usar (este mismo puede ser usado para archivos de imágenes)
        generator: {
          filename: "assets/fonts/[hash][ext][query]", // Directorio de salida
        },
      },
    ],
  },


  plugins: [
    new HtmlWebpack({
      inject: true,
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
    new CopyWebpack({
      patterns: [
        {
          from: Path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    new DotEnv(),
  ],
};
