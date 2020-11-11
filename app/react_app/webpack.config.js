module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$|jsx/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            },
          },
        },
      ],
    },
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  }