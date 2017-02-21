require("babel-register");

module.exports = {
    extends: "remitly/webpack",

    settings: {
        "import/resolver": {
            webpack: {
                config: "util/webpack.config.js",
            },
        },
    },

    rules: {
        "import/extensions": ["error", "always", {
            js: "never",
            jsx: "never",
            ts: "never",
            tsx: "never",
        }],
        "import/no-extraneous-dependencies": ["error", {
            devDependencies: [
                "**/.eslintrc.js",
                "**/__tests__/*.js",
            ],
            optionalDependencies: false,
        }],

        // TODO: this should be reenabled.
        // It's currently required because of our solution to inlining vs loading svg images
        "import/no-webpack-loader-syntax": 0,
    },
};
