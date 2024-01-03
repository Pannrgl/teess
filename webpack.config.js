const path = require('path');

module.exports = {
  entry: './src/index.js', // Sesuaikan dengan file entry point proyek Anda
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Sesuaikan dengan direktori output yang diinginkan
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
};
