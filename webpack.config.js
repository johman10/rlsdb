'use strict';

const path = require('path');
const webpack = require('webpack');

let rendererConfig = {
  devtool: '#eval-source-map',
  entry: {
    index: path.join(__dirname, 'index.js')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    library: 'rlsdb',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [path.resolve(__dirname)],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [],
  resolve: {
    alias: {
      dist: path.join(__dirname, 'dist'),
      functions: path.join(__dirname, 'functions'),
      helpers: path.join(__dirname, 'helpers'),
      test: path.join(__dirname, 'test')
    }
  }
};

if (process.env.NODE_ENV !== 'production') {
  /**
   * Apply ESLint
   */
  rendererConfig.module.rules.push(
    {
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      use: 'eslint-loader'
    }
  );
}

/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  rendererConfig.devtool = '';

  rendererConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
}

module.exports = rendererConfig;
