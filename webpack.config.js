const path = require('path');

module.exports = {
	mode: 'development',

	entry:'./src/main.js',

	module: {
		rules:[
			{
				test: /\.js$/,
				use: ['babel-loader'],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			}
		]

	},

	// devServer: {
	// 	contentBase: './build'
	// 	contentBase: path.resolve(__dirname, 'build')
	// },

	output:{
		filename: '[name].js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build/'
	},

	// watch: true

};
