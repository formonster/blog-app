import React, { FC, useEffect, useLayoutEffect } from "react";
import { css } from "@emotion/css";
import Header from "@/views/module/header";
import classNames from "classnames";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/user";

const style = css`
  min-height: 100vh;
  background-color: black;
`;

const Home: FC = function () {
  const { isLogin } = useRecoilValue(userState);
  return (
    <div className={classNames([style])}>
      <Header />

      <main className="flex justify-center">
        <div className="relative w-5/6 border-2 border-white rounded-sm">
          <div className="absolute -right-10 flex flex-col space-y-3 transition-all transform hover:scale-110">
            {isLogin && (
              <Link to="/blogCreate">
                <div className="w-7 h-7 rounded-full flex justify-center items-center text-white cursor-pointer bg-purple-600">
                  <PlusOutlined />
                </div>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
