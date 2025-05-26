const package = require('./package.json');
const { resolve, join } = require('path');
const { DefinePlugin } = require('webpack');

const name = package.name.replace('@waves/', '');

const getGeneralConfig = (minimize) => ({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: ['node_modules']
    },
    mode: minimize ? "production" : "development",
    devtool: minimize ? undefined : "inline-source-map",
});

const build = (minimize) => ({
    ...getGeneralConfig(minimize),
    entry: join(__dirname, 'src/index.ts'),
    optimization: {
        minimize,
        usedExports: true,
    },
    plugins: [
        new DefinePlugin({
            VERSION: JSON.stringify(package.version)
        })
    ],
    output: {
        library: 'clientLogs',
        libraryTarget: "umd",
        globalObject: "this",
        filename: minimize ? `${name}.min.js` : `${name}.js`,
        path: resolve(__dirname, 'dist'),
    }
});

module.exports = [
    build(true),
    build(false)
];
