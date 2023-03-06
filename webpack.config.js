const path = require('path');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production';

const mode = isProduction ? 'production' : 'development';

module.exports = {
  mode,
  target: 'node',
  externals: [nodeExternals()],
  entry: path.join(__dirname, 'src', 'index.ts'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
    globalObject: 'this',
    clean: true,
    library: {
      name: 'litepay',
      type: 'umd',
    },
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
    fallback: {
      url: false,
      'form-data': false,
    },
  },
};
