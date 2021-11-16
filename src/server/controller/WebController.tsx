import React from "react";
import { renderToString } from "react-dom/server";
import { GET, route } from "awilix-koa";
import { StaticRouter } from "react-router-dom";
import Router from "@koa/router";
import pathConfig from "@/config/path";
import { readFile } from "@/utils/fs";
import { createHtml } from "@/utils/common";
import { renderStylesToString } from "@emotion/server";
import App from "../../views/App";

@route("/*")
class WebController {
  @route("/")
  @GET()
  async hello(ctx: Router.RouterContext, next: () => Promise<unknown>) {
    const url = ctx.req.url;
    // 过滤掉数据请求 API
    if (url.includes("/api")) {
      console.log("- API: ", url);
      await next();
    } else {
      let html = renderStylesToString(
        renderToString(
          <StaticRouter location={ctx.req.url}>
            <App />
          </StaticRouter>
        )
      );

      const template = readFile(pathConfig.template);
      ctx.body = createHtml(template, {
        "<!-- __SSR_HTML__ -->": html,
      });
    }
  }
}
export default WebController;
