const path = require('path');

module.exports = {
    entry: {
        app: './Demo/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    loader: {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            presets: ['@babel/env']
        }
    },
    mode: 'production'
}
