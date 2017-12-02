const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const WebpackChunkHash = require('webpack-chunk-hash')
const syntaxDynamicImport = require('babel-plugin-syntax-dynamic-import')
const transformObjectRestSpread = require('babel-plugin-transform-object-rest-spread')
const transformClassProperties = require('babel-plugin-transform-class-properties')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')


const plugins = [
  new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
  new webpack.DefinePlugin({
    'process.env.CLIENT': JSON.stringify('true')
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  )

  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  )

  plugins.push(
    new UglifyJSPlugin()
  )
  plugins.push(
    new webpack.HashedModuleIdsPlugin()
  )
  plugins.push(
    // Plugin to replace a standard webpack chunk hashing with custom (md5) one.
    new WebpackChunkHash()
  )
  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks({ context }) {
        return context && context.indexOf('node_modules') >= 0 && /corejs-typeahead/.test(context)
      }
    })
  )
  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks({ context }) {
        return context && context.indexOf('node_modules') >= 0 && /axios/.test(context)
      }
    })
  )
  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks({ context }) {
        return context && context.indexOf('node_modules') >= 0 && /@google|google-maps/.test(context)
      }
    })
  )
  plugins.push(
    // catch all - anything used in more than one place
    new webpack.optimize.CommonsChunkPlugin({
      async: 'commonly-used',
      minChunks(module, count) {
        return count >= 3
      }
    })
  )
  plugins.push(
    // This plugin prevents Webpack from creating chunks
    // that would be too small to be worth loading separately
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 20000 // ~15kb
    })
  )
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  )
}

module.exports = {
  entry: {
    main: './source/js/app.js',
    'main.head': './source/js/app.head.js'
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/js/'
  },
  resolveLoader: {
    alias: {
      'advanced-mustache-loader': path.join(__dirname, 'webpack', 'mustache-loader', 'index.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.mustache$/,
        loader: 'advanced-mustache-loader?{origin:"/source/_patterns/"}'
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                modules: false,
                targets: {
                  browsers: ['last 4 versions', 'ie 10']
                },
                useBuiltIns: true,
                // debug: true,
                exclude: [
                  'transform-regenerator',
                  'transform-async-to-generator',
                  'es6.reflect.set',
                  'es6.reflect.set-prototype-of',
                  'es6.reflect.prevent-extensions',
                  'es6.reflect.own-keys',
                  'es6.reflect.is-extensible',
                  'es6.reflect.has',
                  'es6.reflect.get-prototype-of',
                  'es6.reflect.get-own-property-descriptor',
                  'es6.reflect.get',
                  'es6.reflect.delete-property',
                  'es6.reflect.define-property',
                  'es6.reflect.construct',
                  'es6.reflect.apply',
                  'es6.symbol',
                  'web.timers',
                  'web.immediate',
                  'web.dom.iterable',
                  'es7.string.pad-end',
                  'es7.string.pad-start',
                  'es7.object.get-own-property-descriptors',
                  'es7.object.values',
                  'es6.map',
                  'es6.set',
                  'es6.weak-map',
                  'es6.weak-set'
                ]
              }]],
            plugins: [syntaxDynamicImport, transformObjectRestSpread, transformClassProperties]
          }
        }]
      }
    ]
  },
  plugins
}
