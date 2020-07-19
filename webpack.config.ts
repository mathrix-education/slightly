import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {sync as glob} from 'glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import {join} from 'path';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import StartServerPlugin from 'start-server-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import {
  Configuration,
  HotModuleReplacementPlugin,
  WatchIgnorePlugin,
} from 'webpack';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import nodeExternals from 'webpack-node-externals';
import HtmlWebpackTagsPlugin from 'html-webpack-tags-plugin';

// Configuration
const dist = join(__dirname, 'dist');
const assets = join(dist, 'assets');
const appsNames = ['courses', 'flashcards', 'exercises', 'exams'];

module.exports = (env: string) => {
  const production = ['production', 'prod'].includes(env);

  const common = [
    join(__dirname, 'src', 'scss', 'main.scss'),
    // Bricks
    ...glob(join(__dirname, 'src', 'silicate', 'bricks', '*', '*.{scss,bus.ts}'))
      .map((path) => path.replace(__dirname, '.')),
  ];

  const entrypoints = {};
  const plugins = [];

  appsNames.forEach(appName => {
    const chunk = appName;

    entrypoints[chunk] = [
      ...common,
      !production && 'webpack/hot/poll?100',
      `./src/apps/${appName}/scss/main.scss`,
      `./src/apps/${appName}/main.ts`,
    ].filter(e => !!e);

    plugins.push(
      new HtmlWebpackPlugin({
        template: `./src/apps/${appName}/index.hbs`,
        filename: join(dist, 'views', `${appName}.hbs`),
        minify: false,
        chunks: ['bricks', chunk],
        templateParameters: (compilation, assets, assetTags) => {
          // Patch link and src attributes to match webpack's publicPath
          if (!production) {
            assetTags.bodyTags.push({
              tagName: 'script',
              voidTag: false,
              attributes: {
                src: 'http://localhost:35729/livereload.js',
              },
            });
          }

          return {
            htmlWebpackPlugin: {
              tags: [
                ...assetTags.headTags.map(tag => {
                  if (tag.attributes.href && typeof tag.attributes.href === 'string') {
                    tag.attributes.href = tag.attributes.href.replace('assets/assets/', '');
                  }

                  return tag;
                }),
                ...assetTags.bodyTags.map(tag => {
                  // Patch src and href attributes
                  if (tag.attributes.src && typeof tag.attributes.src === 'string') {
                    tag.attributes.src = tag.attributes.src.replace('assets/assets/', '');
                  }

                  console.log(tag);
                  return tag;
                }),
              ],
            },
          };
        },
      }),
    );
  });

  const config: Configuration = {
    entry: {
      server: production ? './src/server/main.ts' : ['webpack/hot/poll?100', './src/server/main.ts'],
      ...entrypoints,
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
      } as unknown as any),
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
                publicPath: assets,
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
      !production && new CleanWebpackPlugin(),
      new ProgressBarPlugin(),
      !production && new HotModuleReplacementPlugin(),
      !production && new WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
      // TypeScript
      new ForkTsCheckerWebpackPlugin(),
      // HTML
      ...plugins,
      new HtmlWebpackTagsPlugin({
        tags: ['http://localhost:35729/livereload.js'],
        usePublicPath: false,
      }),
      // SCSS
      new MiniCssExtractPlugin({
        filename: 'assets/css/' + (production ? '[name].[hash].css' : '[name].css'),
      }),
      // Various assets
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './src/assets/**',
            to: './assets',
            transformPath: (targetPath) => targetPath.replace('src/assets/', ''),
          },
        ],
      }),
      // Handlebars
      new CopyWebpackPlugin({
        patterns: [
          {from: './src/silicate/bricks/*/*.hbs', to: './views/partials', flatten: true},
          {from: './src/views/partials/*.hbs', to: './views/partials', flatten: true},
        ],
      }),
      // Server
      !production && new LiveReloadPlugin(),
      !production && new StartServerPlugin({
        name: 'server.js',
        nodeArgs: ['-r', 'dotenv/config'],
      }),
    ],
    output: {
      path: dist,
      publicPath: 'assets',
      filename: (context) => {
        if (!appsNames.includes(context.chunk.name) && context.chunk.name !== 'bricks') {
          return '[name].js';
        }

        return 'assets/js/' + (production ? '[name].[hash].js' : '[name].js');
      },
    },
  };

  // Filter plugins
  config.plugins = config.plugins.filter((p: any) => p !== false);

  return config;
};