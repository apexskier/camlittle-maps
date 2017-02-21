import webpack from 'webpack';

import config from './webpack.config';

webpack(config).run((err, stats) => {
    if (err) {
        throw err;
    }

    console.log(stats.toString(config.stats));
    process.exit();
});
