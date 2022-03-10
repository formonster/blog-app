import { errorLogger } from "@/utils/logger";
import { resError } from "@/utils/common";
import Router from "@koa/router";

const errorHandler = async (ctx: Router.RouterContext, next: () => Promise<unknown>) => {
    try {
        await next();

        // 404 处理
        if (ctx.status === 404) {
            ctx.status = 404;
            ctx.body = "404";
        }
    } catch (error) {

        ctx.status = error.status || 500;

        if (error.isAxiosError) {
            // 错误处理
            console.log("💥", JSON.stringify(error.response?.data.message));
            errorLogger.error("💥", error.response?.data.message);
            ctx.body = resError(error.response?.data.message);
            return;
        }
        console.log("💥", JSON.stringify(error.message));
        errorLogger.error("💥", error.message);
        ctx.body = resError(error.message);
    }
};
export default errorHandler;
