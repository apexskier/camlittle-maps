/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer');
const postcssReporter = require('postcss-reporter');
// const stylelint = require('stylelint');

module.exports = {
    plugins: [
        // stylelint(),
        autoprefixer({
            browsers: ['defaults', 'last 3 versions', 'last 4 iOS versions', 'last 5 Android versions', '> 1%'],
        }),
        postcssReporter({
            clearMessages: true,
            throwError: true,
        }),
    ],
};
