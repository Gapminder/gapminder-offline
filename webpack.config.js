var webpack = require('webpack');
var helpers = require('./helpers');

var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var METADATA = {
  title: 'Angular2 Minimal Starter',
  baseUrl: '/',
  ENV: 'development'
};

var config = {
  metadata: METADATA,
  devtool: 'source-map',
  debug: true,
  entry: {
    'app': './src/app/main'
  },

  output: {
    path: helpers.root('src/app/dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: helpers.prepend(['.ts', '.js', '.json', '.css', '.html'], '.async') // ensure .async.ts etc also works
  },

  module: {
    preLoaders: [{
      test: /\.ts$/,
      loader: "tslint"
    }],
    loaders: [
      {test: /\.ts$/, loaders: ['ts-loader']},
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.html$/, loader: 'raw-loader', exclude: [helpers.root('app/index.html')]},
      {test: /\.css$/, loader: 'raw-loader'}
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: ['polyfills'], minChunks: Infinity}),
  ],
  tslint: {
    emitErrors: true,
    failOnHint: false,
    resourcePath: 'src/*'
  },
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
