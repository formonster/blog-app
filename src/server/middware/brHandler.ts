import Router from "@koa/router";

const brHandler = async (ctx: Router.RouterContext, next: () => Promise<unknown>) => {

    const openBr = /.(js|css)$/.test(ctx.url) && ctx.headers["accept-encoding"].includes('br');
    const type = openBr && ctx.url.match(/(css|js)$/)[0]

    if (openBr) ctx.url = ctx.url + '.br';

    await next();
    if (openBr) {
        ctx.append("Content-Encoding", "br");
        switch (type) {
            case "js":
                ctx.res.setHeader("Content-Type", "application/javascript; charset=utf-8");
                break;
            case "css":
                ctx.res.setHeader("Content-Type", "text/css; charset=utf-8");
                break;
        }
    }

};
export default brHandler;
