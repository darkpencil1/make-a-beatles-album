const HtmlWebpackPlugin = require ("html-webpack-plugin")
const path = require('path')

const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCSSExtractPlugin = require ('mini-css-extract-plugin')

module.exports = {
    entry:{
        main: "./src/index.tsx",
        vendor: "./src/vendor.tsx"
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
     
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        hot: true
                
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: "./public/index.html"
    }),
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
      
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                MiniCSSExtractPlugin.loader, 
                "css-loader", 
                "sass-loader"
            ]
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: [
                      "@babel/preset-env",
                      "@babel/preset-react",
                      "@babel/preset-typescript",
                    ],
                    "plugins": [
                        "@babel/transform-runtime"
                    ],
                    
                  },
                }
            },    
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].jpg',
                        outputPath: 'assets/img/',
                        publicPath: '../assets/img/'
                    }
                  },
                ],
              },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
      },
}