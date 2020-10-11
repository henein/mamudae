const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  target: 'web',
  entry: ['./src/client/index.ts'],
  plugins: [
    new HtmlWebpackPlugin({
      title: '메이플 무자본 대회',
    }),
    new ESLintWebpackPlugin({ extensions: ['ts', 'js'] }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
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
