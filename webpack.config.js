const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const merge = require("webpack-merge");
// 暂时去掉，因为预加载在node端有问题
// const RouteManifest = require('webpack-route-manifest');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 读取命令行参数
const argv = require("yargs-parser")(process.argv.slice(2));
const mode = argv.mode || "development";

const config = require(`./config/webpack.${mode}`);

const ASSET_PATH = process.env.ASSET_PATH || '/';

const baseConfig = {
    entry: "./src/client/app.tsx",
    output: {
        path: path.join(__dirname, "./dist"),
        publicPath: ASSET_PATH
    },
    experiments: {
        topLevelAwait: true
    },
    // 这些选项能设置模块如何被解析
    resolve: {
        // 自动解析扩展名，当引入数组中的扩展名文件时不用写具体的扩展名
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        // 继承 TS 的 paths 配置
        plugins: [new TsconfigPathsPlugin({
            configFile: path.join(__dirname, "./tsconfig.json")
        })]
    },
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: [
                    "cache-loader",
                    "babel-loader"
                ]
            },
            {
                test: /.css$/,
                use: [
                    "cache-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader",
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: "public/favicon.ico" },
                { from: "public/manifest.json" },
                { from: "public/icons", to: "icons" },
            ],
        }),
        // new RouteManifest({
        //     minify: true,
        //     filename: 'rmanifest.json',
        //     // 将应用程序的import()语句映射到它们将操作的 URL 路由模式中。
        //     routes(str) {
        //         let out = str.replace('./pages', '').toLowerCase();
        //         if (out === '/home') return '/';
        //         console.log("- DING -", str, out);
        //         return out;
        //     },
        // }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ]
}

module.exports = merge.default(baseConfig, config);