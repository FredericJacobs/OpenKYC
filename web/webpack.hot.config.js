var webpack = require('webpack');

module.exports = {
  entry: ["./app/components/Main.js",
  		  'webpack/hot/dev-server',
		  'webpack-dev-server/client?http://localhost:8080'],
  output: {
    filename: "public/bundle.js"
  },
  devServer: {
  	hot: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [  
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
