import React, { FC } from "react";
import { css } from "@emotion/css";
import classNames from "classnames";
import { Link } from "react-router-dom";

const style = css``;

const Header: FC = function () {
  return (
    <header className={classNames([style, "flex justify-between px-10 py-5"])}>
      <div></div>
      <div>
        <nav className="space-x-10">
          <Link className="text-white" to="/blog">
            博客
          </Link>
          <Link className="text-white" to="/note">
            笔记
          </Link>
          <Link className="text-white" to="/demo">
            Demo
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
