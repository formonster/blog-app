import React, { FC } from "react";
import { css, injectGlobal } from "@emotion/css";
import Header from "@/views/module/header";
import classNames from "classnames";
import { RouteComponentProps } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/user";

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
    width: 40vmax;
    height: 40vmax;
    border-top-left-radius: 9999px;
    background-image: linear-gradient(#0042d1, #2facff);
    animation: 5s float infinite alternate;
  }
`;

interface HomeProps extends RouteComponentProps {}

export async function getStaticProps() {
  // const allPostsData = getSortedPostsData()
  return {
    props: {
      data: [{ name: "xxx" }],
    },
  };
}

const Home: FC<HomeProps> = function ({ history }) {
  const { isLogin } = useRecoilValue(userState);

  return (
    <div className={classNames([style])}>
      <Header />
    </div>
  );
};

export default Home;
