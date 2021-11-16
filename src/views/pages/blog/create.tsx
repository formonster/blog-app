import React, { FC } from "react";
import { css } from "@emotion/css";
import Header from "@/views/module/header";
import Markdown from "@/views/components/Markdown";
import classNames from "classnames";
import { Input } from "antd";

const style = css`
  min-height: 100vh;
  background-color: black;
`;

const Home: FC = function () {
  return (
    <div className={classNames([style, "h-screen flex flex-col"])}>
      <Header />

      <div className="flex flex-col h-full">
        <Input className="w-full" placeholder="文章标题" />
        <Markdown className="h-full" edit />
      </div>
    </div>
  );
};

export default Home;
