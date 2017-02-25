const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');

module.exports = env => {

  const config = {
    entry: [
      './src/index.js'
    ],
    output: {
      path: __dirname + '/dist',
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: [
            'babel-loader?sourceMap'
          ]
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract([
            'css-loader',
            'sass-loader'
          ])
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body',
        template: './src/index.html'
      }),
      new ExtractTextPlugin('index.css')
    ]
  };

  if (env && env.dev) {

    config.entry.unshift('webpack-dev-server/client?http://localhost:8080/');
    config.plugins.unshift(new Webpack.HotModuleReplacementPlugin());

    config.devtool = 'source-map';

    config.devServer = {
      contentBase: './',
      hot: true
    };

  }

  return config;

};
