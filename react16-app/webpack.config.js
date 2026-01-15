const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'myapp-react16.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'system',
    publicPath: 'http://localhost:8080/',
  },
  mode: 'development',
  devServer: {
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  externals: ['react', 'react-dom', 'react-router-dom', 'single-spa'],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
};
