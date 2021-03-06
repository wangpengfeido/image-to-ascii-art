const path = require('path');
module.exports = {
  entry: {
    'image-to-ascii-art': './src/image-to-ascii-art.ts',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{loader: 'babel-loader'}, {loader: 'eslint-loader'}],
      },
    ],
  },
};
