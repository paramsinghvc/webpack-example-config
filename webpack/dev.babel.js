import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

import common, { getBabelOptions } from './common.babel.js';

export default merge.smart(common, {
    mode: 'development',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: getBabelOptions('development')
                    },
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                use: [{
                    loader: 'babel-loader',
                    options: getBabelOptions('development')
                }],
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true,
            __PROD__: false,
            __SERVER__: false,
        }),
    ],
    devServer: {
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:8082'
        },
        inline: true,
        open: true,
    }
});
