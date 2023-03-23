//RUTA referente a donde te encuentras
const Path = require("path");
//optimizar javascript
const TerserPlugin = require("terser-webpack-plugin");
//inyectar archivos a HTML
const HtmlWebpack = require("html-webpack-plugin");
//Adaptar atchivos css y preprocesadores a webpack
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//copiar archivos
const CopyWebpack = require("copy-webpack-plugin");
//optimizar CSS
const CssMinimizer = require("css-minimizer-webpack-plugin");
//Seguridad de archivos delicados al hacer deploy
const DotEnv = require("dotenv-webpack");
//crear servidor local
import("webpack").Configuration;


module.exports = {
  //punto de entrada de nuestra aplicacion
  entry: "./src/index.js",
  //salida en donde pondremos dichos archivos generados por webpack
  output: {
    //le decimos donde se encuentra y el nombre del archivo donde se colocara
    path: Path.resolve(__dirname, "dist"),
    //le asignamos nombre al archivo
    filename: "index.js",
    //para mover las imagenes o recursos (Hash: encriptado hash)(repeta la extension del archivo)()
    assetModuleFilename: "assets/images/[hash][ext][query]",
    clean:true,
  },
  mode:"production",
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


  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
      new CssMinimizer()
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
