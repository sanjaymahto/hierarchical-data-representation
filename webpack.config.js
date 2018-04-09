const libraryName = 'dag';
const OUT_FILE = `${libraryName}.js`;

module.exports = {
  entry: {
    bundle: './src/index.js',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: OUT_FILE,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
    ],
  },
  devServer: {
    inline: true,
    contentBase: './example',
  },
};

