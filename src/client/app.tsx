import React from "react";
import ReactDom from "react-dom";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import "lazysizes";
import createCache from "@emotion/cache";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale/zh_CN";
import App from "../views/App";
// import "highlight.js/styles/default.css";
// import "../assets/lib/umbrella.css";
// import "../assets/icons/iconfont.css";
import "./index.css";

ReactDom.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>,
  document.getElementById("app")
);
