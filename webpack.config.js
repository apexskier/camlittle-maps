import path from 'path';
import childProcess from 'child_process';

import webpack from 'webpack';

import pkg from './package.json';


const isDebug = process.env.NODE_ENV !== 'production';

function ifProd(plugin) {
    if (!isDebug) {
        return plugin;
    }

    return {
        apply() {},
    };
}

const stats = {
    colors: true,
    children: false,
    reasons: true,
    timings: true,
    chunks: false,
    chunkModules: false,
    cached: false,
    cachedAssets: false,
};

const fileName = isDebug ? '[path][name]-[hash].[ext]' : '[hash].[ext]';

const srcDir = path.resolve('./src');

export default {
    devtool: 'source-map',

    stats,

    entry: [
        'babel-polyfill',
        './src/index.js',
    ],

    output: {
        path: path.resolve('./dst'),
        publicPath: '/',
        filename: isDebug ? '[name].js' : '[name]_[hash].js',
        sourcePrefix: '  ',
    },

    resolve: {
        extensions: [
            '.js',
        ],
        alias: {
            'mapbox-gl': require.resolve('mapbox-gl/dist/mapbox-gl.js'),
        },
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: srcDir,
                use: [
                    {
                        loader: 'babel-loader',
                        options: pkg.babel,
                    }, {
                        loader: 'eslint-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            minimize: !isDebug,
                        },
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'postcss-scss',
                        },
                    },
                ],
            },
            {
                test: /\.geojson$/,
                use: [
                    {
                        loader: 'json-loader',
                    }
                ]
            },
            {
                test: /\.woff(2)?([#?]?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: fileName,
                        mimetype: 'application/font-woff',
                    },
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: fileName,
                        limit: 10000,
                    },
                },
            },
            {
                test: /\.(eot|mp3|svg|ttf|wav)([#?]?.*)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: fileName,
                    },
                },
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                DEBUG: JSON.stringify(isDebug),
                APP_VERSION: JSON.stringify(pkg.version),
                BUILD_ID: JSON.stringify(childProcess.execSync('git rev-parse HEAD').toString().trim()),
                MAPBOX_STYLE: JSON.stringify(process.env.MAPBOX_STYLE),
                MAPBOX_TOKEN: JSON.stringify(process.env.MAPBOX_TOKEN),
            },
        }),

        // production build plugins
        ifProd(new webpack.LoaderOptionsPlugin({
            minimize: true,
        })),
        ifProd(new webpack.optimize.UglifyJsPlugin({
            // TODO: mangling even _-prefixed props prevents the app from running.
            //       it's not a blocker, but we should look into it at some point.
            // mangle: {
            //     props: {
            //         regex: /^_/,
            //     },
            // },
            output: {
                comments: false,
                space_colon: false,
            },
            sourceMap: true,
        })),
    ],
};
