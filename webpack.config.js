const path = require('path');

module.exports = {
  entry: {
    bundle: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    inline: true,
    contentBase: './example',
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
    ],
  },
};

