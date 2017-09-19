'use strict';

const path = require('path');
const webpack = require('webpack');
const {optimize} = webpack;
const {UglifyJsPlugin} = optimize;

const dir = './lib';

const {env} = process;

const dist = path.resolve(__dirname, 'dist');
const devtool = 'source-map';

const notEmpty = (a) => a;
const clean = (array) => array.filter(notEmpty);

const plugins = clean([
    new UglifyJsPlugin({
        sourceMap: true,
        comments: false,
    })
]);

const rules = clean([{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
}]);

const filename = `[name].min.js`;

module.exports = {
    devtool,
    entry: {
        findit: `${dir}/findit.js`,
    },
    output: {
        library: 'findit',
        filename,
        path: dist,
        pathinfo: true,
        libraryTarget: 'var',
        devtoolModuleFilenameTemplate,
    },
    plugins,
    externals: [
        externals
    ],
    module: {
        rules,
    },
};

function externals(context, request, fn) {
    const list = [
    ];
    
    if (list.includes(request))
        return fn(null, request);
    
    fn();
}

function devtoolModuleFilenameTemplate(info) {
    const resource = info.absoluteResourcePath.replace(__dirname + path.sep, '');
    return `file://findit/${resource}`;
}

