const argv = require("yargs-parser")(process.argv.slice(2));
const mode = argv.mode || "development";
const isProd = mode === "production";

let plugins = [
    require('tailwindcss'),
    // 支持 css next 语法
    require('postcss-nesting'),
]

if (isProd) {
    // 支持 IE
    plugins.push(require('postcss-custom-properties'))
    // 添加浏览器前缀
    plugins.push(require("autoprefixer"))
    // 压缩
    plugins.push(require("cssnano"))
}

module.exports = {
    plugins
}