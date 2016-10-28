/*
 * @Author: sison.luo
 * @Date:   2016-06-12 14:33:10
 * @Last Modified by:   sison
 * @Last Modified time: 2016-10-27 15:18:29
 */

'use strict';

var glob = require('glob');
var webpack = require('webpack');
var path = require('path');
var _ = require('lodash');
var fs = require('fs');
var htmlwebpackplugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var assetsPlugin = require('assets-webpack-plugin');
var assetsJson = new assetsPlugin({
    filename: 'assets.json'
});



var webpackConfig = {
    // entry: {},
    entry: {
    //     layout: './assets/admin/v4.0.3/entry/layout',
    //     form: './assets/admin/v4.0.3/entry/form',
    //     ceng: './assets/admin/v4.0.3/entry/ceng',
    //     fonts: './assets/admin/v4.0.3/entry/fonts',
    //     valid: './assets/admin/v4.0.3/entry/valid',
    //     table: './assets/admin/v4.0.3/entry/table',
    //     css: './assets/admin/v4.0.3/entry/css'
    },
    output: {
        path: path.resolve(__dirname, 'assets/admin/v4.0.3/dist/'),
        filename: 'js/[name].bundle.js?[hash]',
        // publicPath: path.resolve(__dirname, 'assets/admin/v4.0.3/dist/')
        publicPath: './'
    },
    module: {
        loaders: [
            // { test: /\.css$/, loader: 'style!css'},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css-loader") },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap' },
            { test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192&name=/images/[name].[ext]?[hash:8]' }, 
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: 'url?name=/fonts/[name].[ext]'
            },
            {
                test: /(\/|\\)htmpl(\/|\\).*(\.html)$/,
                loader: 'html?config=htmlLoaderConfig'
            }
        ]
    },
    resolve: {
        root: '',
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min'),
            prism: path.resolve(__dirname, 'assets/libs/prism/prism'),
            Pui: path.resolve(__dirname, 'assets/admin/v4.0.3/js/pui.min')
        }
    },
    plugins: [
        new ExtractTextPlugin('css/style.css?[hash]', {
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Pui: "Pui",
            prism: 'prism'
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js?[hash]'),
        assetsJson
    ]
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
var allentry = getEntries('assets/admin/v4.0.3/entry/*.js');

Object.keys(allentry).forEach(function(name) {
    webpackConfig.entry[name] = allentry[name];
    var plugin = new htmlwebpackplugin({
        filename: 'pui-' + name + '.html',
        template: './htmpl/pui-' + name + '.html',
        title: name + ' - 评鉴通UI - pack by webpack',
        inject: 'head',
        chunks: [name, 'vendors'],
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    });
    webpackConfig.plugins.push(plugin);
});

webpackConfig.entry['vendors'] = ['jquery', 'Pui', 'prism'];

module.exports = webpackConfig;
