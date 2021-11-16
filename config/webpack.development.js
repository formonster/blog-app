const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 设置最大能被缓存的文件（默认4M，超过4M则不会被加入到缓存列表中）
// maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
module.exports = {
    output: {
        filename: "[name].js",
    },
    watch: true,
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles/[name].css",
            chunkFilename: "styles/[name].css",
            // 避免 css 重复引入，重复打包
            ignoreOrder: true
        }),
    ]
}