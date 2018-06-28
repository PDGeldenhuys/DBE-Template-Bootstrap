const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const DEV_MODE = process.env.NODE_ENV === 'dev'

module.exports = {
    devtool: DEV_MODE ? 'eval' : 'source-map',
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            DEV_MODE
                ? {
                    test: /\.scss/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
                : {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    })
                },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Popper: 'popper.js'
        }),
        new HtmlWebPackPlugin({
            template: 'pages/index.html'
        }),
        new CopyWebpackPlugin([
            {from:'src/img',to:'assets/img/'},
        ]),
        new ExtractTextPlugin('assets/css/styles.css')
    ]
}