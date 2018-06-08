import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

import common, { getBabelOptions } from './common.babel.js';

export default merge.smart(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: {
            name: 'manifest'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: getBabelOptions('production')
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
                    options: getBabelOptions('production')
                }],
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            __DEV__: false,
            __PROD__: true,
            __SERVER__: false,
        }),
    ]
});
