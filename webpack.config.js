const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

class CopyPublicAssetsPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('CopyPublicAssetsPlugin', (compilation) => {
      const fromDir = path.resolve(__dirname, 'public');
      const toDir = compilation.outputOptions.path;

      for (const file of fs.readdirSync(fromDir)) {
        if (file === 'index.html') continue;

        fs.copyFileSync(path.join(fromDir, file), path.join(toDir, file));
      }
    });
  }
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  process.env.NODE_ENV = isProduction ? 'production' : 'development';

  return {
    entry: './src/index.js',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[contenthash].js',
      publicPath: '/',
      clean: true,
    },

    resolve: {
      extensions: ['.js', '.jsx'],
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                  },
                ],
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic',
                    development: !isProduction,
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.module\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isProduction
                    ? '[hash:base64:6]'
                    : '[name]__[local]--[hash:base64:5]',
                  namedExport: false,
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.svg$/i,
          oneOf: [
            {
              issuer: /\.jsx?$/,
              use: ['@svgr/webpack'],
            },
            {
              type: 'asset/resource',
            },
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new CopyPublicAssetsPlugin(),
      ...(isProduction
        ? [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })]
        : []),
    ],

    devServer: {
      static: path.resolve(__dirname, 'dist'),
      port: 3000,
      hot: true,
      historyApiFallback: true,
    },

    performance: {
      hints: false,
    },

    devtool: isProduction ? false : 'source-map',
  };
};
