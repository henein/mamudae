const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  target: 'web',
  entry: { index: './src/client/index.ts', admin: './src/client/admin.ts' },
  plugins: [
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js',
    }),
    new CleanWebpackPlugin({ verbose: true }),
    new HtmlWebpackPlugin({
      title: '메이플 무자본 대회',
      filename: '../index.html',
      excludeChunks: ['admin'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/client/views/admin.html',
      filename: '../admin.html',
      chunks: ['admin'],
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/client/assets', to: '../assets' }],
    }),
    new ESLintWebpackPlugin({ extensions: ['ts', 'js'] }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.mjs', '.json'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/public/js'),
    publicPath: 'js',
    filename: '[name].[contenthash].js',
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js|mjs)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: false }],
              '@babel/proposal-object-rest-spread',
              [
                '@babel/transform-runtime',
                {
                  corejs: 3,
                },
              ],
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        include: /node_modules\/pixi.js/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.m?js$/,
        include: /node_modules\/pixi-filters/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.m?js$/,
        include: /node_modules\/@pixi\/ui/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};
