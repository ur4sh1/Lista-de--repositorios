const path =  require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production'
const ReactRefresh = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  entry: path.resolve(__dirname, 'src','index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js','.jsx',]
  },
  plugins: [
    isDevelopment && new ReactRefresh(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ].filter(Boolean),
  devServer: {
    //contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    static: path.resolve(__dirname, 'public'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader','css-loader', 'sass-loader'],
      }
    ]
  }
};