const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const BrotliPlugin = require('brotli-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    output: {
        filename: "scripts/[name].[hash:5].js",
    },
    plugins: [
        // https://developers.google.cn/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW
        new WorkboxPlugin.GenerateSW({
            swDest: 'sw.js',
            skipWaiting: false,
            // 现在这样配置不正确
            // additionalManifestEntries: ["images/*"],
            //取得页面控制权 旧的不再生效理解接管
            clientsClaim: true,
            // 尝试删除老版本缓存
            cleanupOutdatedCaches: true,
            // 设置最大能被缓存的文件（默认4M，超过4M则不会被加入到缓存列表中）
            maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
            // mode: 'production',
            //如果不想从本地去加载对应的文件
            // importWorkboxFrom: 'disabled',
            // // 把local模式导出的文件, 先部署获取到cdn链接, 在写死就ok
            // importScripts: 'https://cdn/workbox-sw.js',
            // Do not precache images
            exclude: [/\.(?:png|jpg|jpeg|svg|webp|DS_Store)$/],

            // Define runtime caching rules.
            runtimeCaching: [
                {
                    handler: 'NetworkFirst',
                    urlPattern: '/',
                },
                {
                    // Match any request that ends with .png, .jpg, .jpeg or .svg.
                    urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,

                    // Apply a cache-first strategy.
                    handler: 'CacheFirst',

                    options: {
                        // Use a custom cache name.
                        cacheName: 'images',

                        // Only cache 10 images.
                        expiration: {
                            maxEntries: 10,
                        },
                    },
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "styles/[name].[contenthash:5].css",
            chunkFilename: "styles/[id].[contenthash:5].css",
            // 避免 css 重复引入，重复打包
            ignoreOrder: true
        }),
        new BrotliPlugin({
            asset: '[file].br',
            test: /\.(js|css)$/
        }),
        new BundleAnalyzerPlugin({
            analyzerPort: 8888
        })
    ]
}