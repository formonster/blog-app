import React, { FC, useCallback, useState } from "react";
import { css, injectGlobal } from "@emotion/css";
import World from "@/views/components/World";
import Header from "@/views/module/header";
import { inputChange } from "@/utils/domChange";
import classNames from "classnames";
import { Button, Input } from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import { useUserAction } from "@/store/user";
import { RouteComponentProps } from "react-router-dom";

injectGlobal`
@keyframes float{
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-20px);
  }
}
`;

const style = css`
  min-height: 100vh;
  background-image: linear-gradient(45deg, #363636, #1f1f1f, #383838, #000);

  &::before {
    content: "";
    position: absolute;
    bottom: -20px;
    right: 0;
    width: 600px;
    height: 600px;
    border-top-left-radius: 9999px;
    background-image: linear-gradient(#0042d1, #2facff);
    animation: 5s float infinite alternate;
  }

  .phone {
    backdrop-filter: blur(30px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.15),
      1px 1px 1px 0 rgba(255, 255, 255, 0.2) inset,
      -1px -1px 1px 0 rgba(0, 0, 0, 0.2) inset;
    background-color: rgba(255, 255, 255, 0.1);
    transform: translate3d(-50%, -50%, 50px);
  }
`;

interface LoginProps extends RouteComponentProps {}

const Login: FC<LoginProps> = function ({ history }) {
  const [account, setAccount] = useState("18811484300");
  const [password, setPassword] = useState("173923");

  const { loginHandler } = useUserAction();

  const login = useCallback(async () => {
    const result = await loginHandler(account, password);
    if (result) history.push("/");
  }, [account, password]);

  return (
    <div className={classNames([style])}>
      <Header />
      <World hover={{ angle: 3 }}>
        <div className="phone absolute w-80 h-3/4 rounded-md left-1/2 top-1/2 p-5 space-y-3 style-3d ">
          <p className="text-white text-center font-bold text-2xl drop-shadow-sm">
            Login
          </p>
          <Input
            value={account}
            onChange={inputChange(setAccount)}
            prefix={<UserOutlined />}
          />
          <Input
            value={password}
            onChange={inputChange(setPassword)}
            prefix={<LockOutlined />}
            type="password"
          />
          <Button onClick={login} type="primary" block>
            登录
          </Button>
        </div>
      </World>
    </div>
  );
};

export default Login;
