import path from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import FixDefaultImportPlugin from 'webpack-fix-default-import-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const babelOptions = {
    presets: [
        [
            'env',
            {
                modules: false
            }
        ],
        'stage-2',
        'react'
    ],
    plugins: [
        'transform-react-pug',
        ['transform-runtime', {
            helpers: false,
            polyfill: true,
            regenerator: true,
            moduleName: 'babel-runtime'
        }],
        'transform-object-rest-spread',
    ]
};

export const getBabelOptions = (mode) => {
    if (mode === 'development') {
        return {
            ...babelOptions,
            plugins: [
                ...babelOptions.plugins,
                'react-hot-loader/babel'
            ]
        }
    }
    return babelOptions;
}

const plugins = [
    new HTMLWebpackPlugin({
        template: './src/index.html',
    }),
    new CleanWebpackPlugin(['dist'], {
        verbose: true,
        root: process.cwd()
    }),
    new FixDefaultImportPlugin(),
];

if (process.env.ANALYZE === 'true') {
    plugins.push(new BundleAnalyzerPlugin());
}

export default {
    entry: {
        app: './src/index.tsx'
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        path: path.resolve('./dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
        modules: [path.resolve('./src'), 'node_modules'],
        alias: {
            src: path.resolve('./src')
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192, // settings the limit to 8 KB
                        fallback: 'file-loader',
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts'
                    }
                }
            },
            {
                test: /\.(png|jpeg|jpg|gif|webp)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192, // settings the limit to 8 KB
                        fallback: 'file-loader',
                        name: '[name].[ext]',
                        outputPath: 'assets/images'
                    }
                }
            },
        ]
    },
    plugins,
}