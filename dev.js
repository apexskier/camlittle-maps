import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from './webpack.config';

const host = '0.0.0.0';
const port = 3000;

config.entry.unshift('webpack/hot/only-dev-server');
config.entry.unshift(`webpack-dev-server/client?http://${host}:${port}/`);

config.plugins.push(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
    contentBase: 'src',
    compress: true,

    hot: true,

    stats: config.stats,
});

server.listen(port, host, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Listening at http://${host}:${port}/`);
    }
});
