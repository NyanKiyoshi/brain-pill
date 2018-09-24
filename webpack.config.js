var BundleTracker = require('webpack-bundle-tracker');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require('path');
var url = require('url');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var resolve = path.resolve.bind(path, __dirname);

var extractCssPlugin;
var fileLoaderPath;
var output;

const baseStaticPath = process.env.STATIC_URL || '/static/';
const publicPath = url.resolve(baseStaticPath, 'assets/');

output = {
  path: resolve('static/assets/'),
  filename: '[name].js',
  chunkFilename: '[name].js',
  publicPath: publicPath
};
fileLoaderPath = 'file-loader?name=[name].[ext]';
extractCssPlugin = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[name].css'
});

var bundleTrackerPlugin = new BundleTracker({
  filename: 'webpack-bundle.json'
});

var providePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
  'Popper': 'popper.js',
  'query-string': 'query-string'
});

var config = {
  entry: {
    front: './static/js/front.js',
    live: './static/js/live.js',
  },
  output: output,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              'sourceMap': true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              'sourceMap': true,
              'plugins': function () {
                return [autoprefixer];
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              'sourceMap': true
            }
          }
        ]
      },
      {
        test: /\.(eot|otf|png|svg|jpe?g|ttf|woff|woff2|wav)(\?v=[0-9.]+)?$/,
        loader: fileLoaderPath,
        include: [
          resolve('node_modules'),
          resolve('static/fonts'),
          resolve('static/images'),
          resolve('static/sounds'),
          resolve('static/dashboard/images'),
          resolve('static/dashboard/fonts')
        ]
      }
    ]
  },
  plugins: [
    bundleTrackerPlugin,
    extractCssPlugin,
    providePlugin
  ],
  resolve: {
    alias: {
      'jquery': resolve('node_modules/jquery/dist/jquery.js')
    }
  }
};

module.exports = config;
