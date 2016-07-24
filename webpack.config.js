var path = require('path');

module.exports = {
  entry: './app/main.js',
  output: {
    path: './app',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    contentBase: './app',
    port: 8100
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
         test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
         loader: "file" 
      }
    ]
  }
}
