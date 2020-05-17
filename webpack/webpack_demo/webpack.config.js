const path = require('path')
module.exports = {
  entry: {
    index: './src/index.js',
    login: './src/login.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[hash].js' // '[name]_[chunkhash:8].js'
  },
  mode: 'development'
}