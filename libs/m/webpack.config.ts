import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const config: webpack.Configuration = {
  mode: 'development',
  entry: './src/client/index.ts',
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new ESLintPlugin({ extensions: ['ts', 'js'] }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: { noEmitOnErrors: true },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
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

export default config;
