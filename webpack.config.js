/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var webpack = require('webpack');
var helpers = require('./helpers');

var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var METADATA = {
  title: 'Angular2 Minimal Starter',
  baseUrl: '/',
  ENV: 'development'
};

var config = {
  // static data for index.html
  metadata: METADATA,
  // for faster builds use 'eval'
  devtool: 'source-map',
  debug: true,
  // cache: false,

  // our angular app
  entry: {
    'app': './src/app/main'
  },

  // Config for our build files
  output: {
    path: helpers.root('src/app/dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    // ensure loader extensions match
    extensions: helpers.prepend(['.ts', '.js', '.json', '.css', '.html'], '.async') // ensure .async.ts etc also works
  },

  module: {
    /*preLoaders: [{
      test: /\.ts$/,
      loader: "tslint"
    }],*/
    loaders: [
      {test: /\.ts$/, loaders: ['ts-loader']},
      // Support for *.json files.
      {test: /\.json$/, loader: 'json-loader'},

      // support for .html as raw text
      {test: /\.html$/, loader: 'raw-loader', exclude: [helpers.root('app/index.html')]}
    ]
  },

  plugins: [

    // Plugin: CommonsChunkPlugin
    // Description: Shares common code between the pages.
    // It identifies common modules and put them into a commons chunk.
    //
    // See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    // See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
    new webpack.optimize.CommonsChunkPlugin({name: ['vendor', 'polyfills'], minChunks: Infinity}),
  ],
  // Other module loader config
  tslint: {
    emitErrors: true,
    failOnHint: false,
    resourcePath: 'src/*'
  },
  // we need this due to problems with es6-shim
  node: {
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};

config.target = webpackTargetElectronRenderer(config);
module.exports = config;
