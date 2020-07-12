const {HotModuleReplacementPlugin, WatchIgnorePlugin} = require('webpack');
const {join} = require('path');
const nodeExternals = require('webpack-node-externals');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // installed via npm
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const StartServerPlugin = require('start-server-webpack-plugin');
const {sync} = require('glob');

// Configuration
const distFolder = join(__dirname, 'dist');

module.exports = (env, argv) => {
  const production = ['production', 'prod'].includes(env);

  const bricks = sync(join(__dirname, 'src', 'bricks', '*', '*.{scss,ts}')).map((path) => {
    return path.replace(__dirname, '.');
  });

  const config = {
    entry: {
      server: production ? './src/main.ts' : ['webpack/hot/poll?100', './src/main.ts'],
      'assets/js/bus': ['./src/bus/bus.ts', './src/assets/main.scss', ...bricks],
    },
    mode: production ? 'production' : 'development',
    devtool: production ? 'hidden-source-map' : 'source-map',
    target: 'node',
    node: {
      __dirname: false,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.hbs', '.scss'],
    },
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: join(distFolder, 'assets'),
              },
            },
            'css-loader',
            'sass-loader',
            'postcss-loader',
          ],
        },
      ],
    },
    optimization: {
      minimize: production,
      minimizer: [
        new TerserPlugin({
          exclude: /server/,
        }),
        new OptimizeCSSAssetsPlugin(),
      ],
    },
    plugins: [
      // System
      new CleanWebpackPlugin(),
      new ProgressBarPlugin(),
      !production && new HotModuleReplacementPlugin(),
      !production && new WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
      // TypeScript
      new ForkTsCheckerWebpackPlugin(),
      // SCSS
      new MiniCssExtractPlugin({
        filename: 'assets/css/style.css',
      }),
      // Handlebars
      new CopyWebpackPlugin({
        patterns: [
          {from: './src/bricks/*/*.hbs', to: './views/partials', flatten: true},
          {from: './src/views', to: './views'},
        ],
      }),
      // Server
      !production && new LiveReloadPlugin(),
      !production && new StartServerPlugin({
        name: 'server.js',
        nodeArgs: ['-r', 'dotenv/config']
      }),
    ],
    output: {
      path: distFolder,
      filename: '[name].js',
    },
  };

  // Filter plugins
  config.plugins = config.plugins.filter(p => p !== false);

  return config;
}