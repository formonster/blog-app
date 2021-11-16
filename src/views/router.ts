import { RouteConfig } from "react-router-config";

import * as Home from './pages/home'
import Login from './pages/login'
import Blog from './pages/blog'
import Note from './pages/note'
import BlogCreate from './pages/blog/create'

console.log(Home.getStaticProps);

const router: RouteConfig[] = [
    {
        path: "/",
        key: "/",
        exact: true,
        page: Home,
        // 暂时取消 prefetch 方案，因为只要有 import Home from './pages/home' 最终的包大小就不会减少，起不到分包的作用
        // 因为 withQuicklink 中调用了很多浏览器中的 API ，所以在 node 端不能使用，需要判断环境来区分加载
        // 要找找怎么异步引入 Home 组件
        // component: isWin ? withQuicklink(lazy(() => import("./pages/home")), options) : Home,
        component: Home.default,
    },
    {
        path: "/blog",
        key: "/blog",
        exact: true,
        component: Blog,
    },
    {
        path: "/note",
        key: "/note",
        exact: true,
        component: Note,
    },
    {
        path: "/blogCreate",
        key: "/blogCreate",
        exact: true,
        component: BlogCreate,
    },
    {
        path: "/login",
        key: "/login",
        exact: true,
        component: Login,
    },
]

export default router