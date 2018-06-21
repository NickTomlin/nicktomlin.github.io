const path = require('path')
const webpack = require('webpack')
const glob = require('glob')

function filePathToEntry (entries = {}, filePath) {
  const fileName = path.basename(filePath, '.js')
  return Object.assign(entries, { [fileName]: filePath })
}

const entry = glob
  .sync('./javascript/**/*.js')
  .reduce(filePathToEntry, {})

module.exports = {
  mode: 'development',
  entry,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      'NODE_ENV': 'development',
      'GRAPHQL_ENDPOINT': '',
    })
  ],
  output: {
    path: path.resolve(__dirname, '_site', 'javascript'),
    filename: '[name].bundle.js'
  }
};
