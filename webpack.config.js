const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const nodeEnv = process.env.NODE_ENV

const common = {
  target: 'electron-renderer',

  entry: {
    'app': path.resolve(__dirname, 'src/index.jsx'),
    'timer': path.resolve(__dirname, 'src/timer.jsx'),
    'print': path.resolve(__dirname, 'src/print.jsx')
  },

  output: {
    path: path.resolve(__dirname),
    filename: './dist/[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(jsx?|json)$/,
        loader: 'babel-loader',
        options: JSON.stringify({
          presets: ['react', 'es2015', 'stage-3']
        }),
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}

if (nodeEnv === 'production') {
  module.exports = merge.smart(common, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  })
} else {
  module.exports = merge.smart(common, {
    devtool: 'inline-source-map',

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]
  })
}
