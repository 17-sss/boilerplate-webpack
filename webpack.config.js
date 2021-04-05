const path = require('path');
// MiniCssExtractPlugin, 컴파일된 css를 별도의 CSS 파일로 분리할 때 사용
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// bundle된 js와 css를 자동으로 index.html에 추가하여 index.html을 만들어냄.
const HtmlWebpackPlugin = require("html-webpack-plugin");
// Clean Webpack Plugin은 성공적으로 다시 빌드 한 후 webpack의 output.path 디렉토리에 있는 모든 파일과 사용하지 않는 모든 bundle된 파일을 제거.
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const config = {
    // https://webpack.js.org/concepts/mode/#mode-development
    mode: 'development',
    devtool: 'inline-source-map',

    // entry file
    entry: [
        '@babel/polyfill',
        './src/js/index.js',
        './src/sass/index.scss',
    ],
    // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
    output: {
        path: path.resolve(__dirname, './src/dist'),
        filename: 'js/[name].[hash].js',
        publicPath: "/",
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
        new MiniCssExtractPlugin({ filename: 'css/style.css' }),
        new HtmlWebpackPlugin({
            template: './views/index.html',
            filename: 'index.html',
            templateParameters: {
                title: 'Webpack Express Boilerplate : Normal Version',
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, './src/js')],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, './src/sass')],
                exclude: /node_modules/,
                use: [
                    // 'style-loader', // creates style nodes from JS strings   (컴파일된 css를 bundle.js 파일에 포함시킬때 사용)
                    MiniCssExtractPlugin.loader, // 컴파일된 css를 별도의 CSS 파일로 분리할 때 사용
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader', // compiles Sass to CSS, using Node Sass by default
                ],
            },
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, './src/dist'),
        index: "index.html",
        port: 3000,
        hot: true,
    },
};
module.exports = config;