const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/proposal-class-properties', "@babel/plugin-transform-runtime"],
        },
      },
      {
        // write image files under 10k to inline or copy image files over 10k
        test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  plugins: [
    // new MiniCssExtractPlugin({ filename: 'app.css' }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const path = require('path');

// module.exports = {
//   entry: './src/index.tsx',
//   output: {
//     path: path.join(__dirname, '../dist'),
//     filename: '[name].[contenthash].js',
//     publicPath: '/',
//   },
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js'],
//     alias: {
//       '@': path.resolve(__dirname, '../src/'),
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(ts|tsx)$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         options: {
//           presets: ['@babel/preset-env', '@babel/preset-react'],
//           plugins: ['@babel/proposal-class-properties', "@babel/plugin-transform-runtime"],
//         },
//       },
//       {
//         // write image files under 10k to inline or copy image files over 10k
//         test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
//         use: [
//           {
//             loader: 'url-loader',
//             options: {
//               limit: 10000,
//               fallback: 'file-loader',
//               name: 'images/[name].[ext]',
//             },
//           },
//         ],
//       },
//       {
//         test: /\.css$/i,
//         use: ["style-loader", "css-loader"],
//       },
//     ],
//   },
  
//   optimization: {
//     runtimeChunk: 'single',
//     splitChunks: {
//       chunks: 'all',
//       maxInitialRequests: Infinity,
//       minSize: 0,
//       cacheGroups: {
//         vendor: {
//           test: /[\\/]node_modules[\\/]/,
//           name(module) {
//             // get the name. E.g. node_modules/packageName/not/this/part.js
//             // or node_modules/packageName
//             const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

//             // npm package names are URL-safe, but some servers don't like @ symbols
//             return `npm.${packageName.replace('@', '')}`;
//           },
//         },
//       },
//     },
//   },
//   plugins: [
//     // new MiniCssExtractPlugin({ filename: 'app.css' }),
//     new CleanWebpackPlugin({
//       cleanStaleWebpackAssets: false,
//     }),
//     new HtmlWebpackPlugin({
//       template: './src/index.html',
//     }),
//   ],
// };