var path = require('path');
var webpack = require('webpack');
const validate = require('webpack-validator');

var BUILD_NAME = 'build/'; // publicPath: '/' // publicPath: '/assets/'
var SRC_NAME = 'src/';
var BUILD_DIR = path.resolve(__dirname, BUILD_NAME); //path.join(__dirname, '/dist'), // path.resolve(__dirname, 'dist'),
var SRC_DIR = path.resolve(__dirname, SRC_NAME); //path.join(__dirname, 'src'),

module.exports = validate({
	devtool: 'eval', // 'eval' for development, 'source-map' for production
	entry: [
		'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
		'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
		'./' + SRC_NAME + 'index' // Your appʼs entry point
	],
	output: {
		path: BUILD_DIR,
		filename: 'index.js',
		publicPath: '/' + BUILD_NAME
	},
	module: {
		loaders: [
		{
			test: /\.js$/,
			loaders: ['react-hot', 'babel'],
			include: SRC_DIR,
			exclude: /node_modules/
		}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
	// debug: true
});