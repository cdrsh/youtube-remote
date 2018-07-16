'use strict';


const config = require('./config/dev.js');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack');
function resolve (dir) {
	return path.join(__dirname, '..', dir)
}
module.exports = {


	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src')
		},
	},

	resolve: {
        extensions: ['*', '.js', '.vue', '.json']
	},


	entry: [
		'./assets/webpack/src/index.js'
		//'src/index.js'
	],

	devtool: 'cheap-inline-module-source-map',

	module: {
		rules: [
			{
				test: /\.vue$/,
				use: [{
					loader:'vue-loader',
					options: {
						loaders: {
							js: 'babel-loader'
						}
					}
				}]
			},
			/*
			{
				test: /\.js$/,
				use: [{loader:'babel-loader'}]
			},
			*/
			{
				test: /\.css$/,
				use:[
					{loader:'vue-style-loader'},					
					{loader:'css-loader',options:{importLoaders:1}},
					{loader:'postcss-loader'},
				]
			},
			{
				test: /\.less$/,
				use:[
					{loader:'vue-style-loader'},
					{loader:'css-loader',options:{importLoaders:2}},
					{loader:'postcss-loader'},
					{loader:'less-loader'}
				]
			},
			{
				test: /\.scss$/,
				use:[
					{loader:'vue-style-loader'},
					{loader:'css-loader',options:{importLoaders:2}},
					{loader:'postcss-loader'},
					{loader:'sass-loader'}
				]
			},
			{
				test: /\.(jpe|jpg)(\?.*$|$)/,
				exclude: /\/node_modules\//,
				use:[{loader: 'url-loader',options:{importLoaders:1,limit:100000}}]
			},

			{
				test: /\.(png|jpg|gif).*$/,
				include: /images/,
				use:[{loader: 'url-loader',options:{importLoaders:1,limit:100000}}]
			},       
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
				{
					loader: 'url-loader',
					options: {
					limit: 65000,
					mimetype: 'application/font-woff'
					}
				}
				]
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
				{ loader: 'file-loader' }
				]
			},
			{
				test: /\.pug/,
				use:[
					{loader:'html-loader'},
					{loader:'pug-html-loader'}
				  ],
				  exclude: /node_modules/
			}
	  	]
	},


	output: {
        path: path.resolve(__dirname + config.dist),
        publicPath: '/',
        filename: 'bundle.js'
	},

	plugins: [
		new VueLoaderPlugin(),
		new webpack.LoaderOptionsPlugin({
			minimize: false,
			debug: true
		}),
		new webpack.NoEmitOnErrorsPlugin(),
	],

	devServer: {
        host: config.server.host,
		port: config.server.clientport,
		contentBase: path.resolve(config.dist),
		historyApiFallback: true,
		publicPath: "/",
		proxy: [{
			context: ["/api"],
			target: "http://"+config.server.host+":"+config.server.port,
		}],
        stats:
        {
            colors: true
        }
	}

};
