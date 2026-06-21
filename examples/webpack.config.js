const path = require('path');

const ExtractCSSPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const extractStyles = new ExtractCSSPlugin({
  filename: "styles.css"
});

const dir = path.resolve(__dirname, "./TodoApp");

module.exports = {
  mode: 'development',
  entry: `${dir}/index.js`,
  output: {
    path: `${dir}/dist`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          {loader: ExtractCSSPlugin.loader},
          "css-loader",
          "stylus-loader",
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      } 
    ]
  },
  devtool: "cheap-module-source-map",
  plugins: [extractStyles],
  optimization: {
    minimizer:[
      "...",
      new CssMinimizerPlugin({})
    ]
  },
  resolve: {
    modules: ['node_modules']
  }
};
