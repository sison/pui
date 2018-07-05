/*
 * @Author: sison.luo
 * @Date:   2016-06-12 14:33:10
 * @Last Modified by: sison
 * @Last Modified time: 2018-07-05 15:27:26
 */

'use strict';

const glob = require('glob');
const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const htmlwebpackplugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const assetsPlugin = require('assets-webpack-plugin');
const assetsJson = new assetsPlugin({
    filename: 'assets.json'
});

const webpackConfig = {
    mode: 'development',
    entry: {},
    // devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9999,
        // inline: true,
        // hot: true,
        open: true,
        // compress: true,
        overlay: true
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'js/[name].bundle.js?[hash]',
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: [
                //     MiniCssExtractPlugin.loader,
                //     'css-loader'
                // ]
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }]
                })
            },
            { 
                test: /\.js$/, 
                use: ['jsx-loader'],
                exclude: '/node_modules/'
            },            {
                test: /\.scss$/,
                // use: [
                //     MiniCssExtractPlugin.loader,
                //     'css-loader', 
                //     'sass-loader'
                // ]
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:  ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'images/[name].[ext]?[hash:8]'
                    }
                }]
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '/fonts/[name].[ext]'
                    }
                }]
            },
            {
                test: /(\/|\\)assets(\/|\\)htmpl(\/|\\).*(\.html)$/,
                use: {
                    loader: 'html-loader',
                    options: { 
                        minimize : true
                    }
                }
            }
        ],
        // noParse: ['/node_modules/perfect-scrollbar/dist/js/perfect-scrollbar.js']
    },
    resolve: {
        extensions: ['.js', '.json', '.css'],
        alias: {
            jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
            prism: path.resolve(__dirname, 'assets/libs/prism/prism.js')
        }
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].chunk.css?[hash]'
        }),
        // new MiniCssExtractPlugin({
        //     filename: "css/[name].css?[hash]"
        // }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Pui: "pjt-ui",
            prism: "prism"
        }),
        new UglifyJsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'js/vendor.js?[hash]',
        //     minChunks: Infinity
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: true
        // }),
        assetsJson
        // new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        // runtimeChunk: {
        //     name: "manifest"
        // },
        splitChunks: {
            // minChunks: 2,
            // name: true,
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2,
                    minSize: 0
                    // enforce: true,
                    // chunks: "initial"
                }
            }
        }
        // minimizer: [
        //     new OptimizeCSSAssetsPlugin({})
        // ]
    }
}


var getEntries = function(globPath) {
    var files = glob.sync(globPath);
    var entries = {};
    files.forEach(function(filepath) {
        var split = filepath.split('/');
        var name = split[split.length - 1];
        name = name.replace('\.js', '');
        entries[name] = './' + filepath;
    });
    return entries;
}

var allentry = getEntries('assets/admin/entry/*.js');

Object.keys(allentry).forEach(function(name) {
    webpackConfig.entry[name] = allentry[name];
    var plugin = new htmlwebpackplugin({
        filename: 'pui-' + name + '.html',
        template: 'assets/htmpl/pui-' + name + '.html',
        // title: name + ' - 评鉴通UI',
        hash: true,
        inject: 'head',
        chunks: [name, 'vendor', 'commons'],
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    });
    webpackConfig.plugins.push(plugin);
});

webpackConfig.entry['vendor'] = ['prism'];

module.exports = webpackConfig;