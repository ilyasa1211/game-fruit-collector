// Generated using webpack-cli https://github.com/webpack/webpack-cli

import { resolve as _resolve } from 'path';
import { readdirSync } from "node:fs";
import path from "node:path";

function readDirectoryRecursive(directory) {
    const files = readdirSync(directory, { withFileTypes: true }).flatMap((file) => {
        const fullpath = "." + path.posix.sep + path.join(directory, file.name);
        return file.isDirectory() ? readDirectoryRecursive(fullpath) : fullpath;
    });
    return files;
}


const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = 'style-loader';

const entrypoint = "./src/index.html";

const entries = readDirectoryRecursive("./src").filter((entry) => entry !== entrypoint);

const config = {
    entry: entries,
    output: {
        path: _resolve('dist'),
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

export default () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
