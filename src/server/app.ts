// 解决 TS 别名在 React 项目中加载失败的问题
import 'module-alias/register'
import Koa from "koa";
import bodyParser from 'koa-bodyparser';
import { createContainer, Lifetime } from "awilix";
import { scopePerRequest, loadControllers } from "awilix-koa";
import serve from 'koa-static-cache';
import koajwt from "koa-jwt";
import proxy from "koa-proxy";

import serverConfig from "@/config/server";
import pathConfig from "@/config/path";
import publicRouter from "@/config/publicRouter";

import { loadMiddware } from './middware'

// koa-webpack（自动刷新浏览器）不支持 webpack5

const app = new Koa();

// https://www.npmjs.com/package/koa-compress
// koa-compress 暂时不需要，因为资源已经通过 webpack 和 gulp 压缩过了，而且 br 格式实时压缩比较慢
// app.use(compress({
//     filter(content_type) {
//         return /.(webp|jpg|png|svg)/i.test(content_type)
//     },
//     // 要压缩的最小响应大小（以字节为单位）。默认1024字节或1kb.
//     threshold: 2048,
// }))

// POST 请求获取 body
app.use(bodyParser())
// 加载自定义中间件
loadMiddware(app);

// 处理静态资源
app.use(serve(pathConfig.staticDir, {
    maxAge: 365 * 24 * 60 * 60,
    gzip: true,
    dynamic: true,
}));
app.use(serve(pathConfig.buildDir, {
    maxAge: 0,
    gzip: true,
    dynamic: true,
    filter: (e) => {
        return !/index.html|main.js/.test(e);
    }
}));
app.use(
    koajwt({
        secret: serverConfig.secretKey,
    }).unless({ path: publicRouter })
);

// oss
app.use(proxy({
    host: serverConfig.ossServerHost,
    match: /^\/oss\//
}))

// 创建一个基础容器，负责装载服务
const container = createContainer();
// 加载 Service 模块
container.loadModules([`${__dirname}/service/*.ts`], {
    // 定义命名方式：驼峰形式
    formatName: "camelCase",
    resolverOptions: {
        // 每次调用都创建新的实例
        lifetime: Lifetime.SCOPED
    }
})
// 注入 container
app.use(scopePerRequest(container));
// 加载路由
app.use(loadControllers(`${__dirname}/controller/*.ts`));
app.use(loadControllers(`${__dirname}/controller/WebController.tsx`));

app.listen(serverConfig.port, function () {
    console.log(`🚀 starting http://localhost:${serverConfig.port}`);
})