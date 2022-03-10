import React, { FC, useCallback, useMemo, useState } from "react";
import { css, injectGlobal } from "@emotion/css";
import Header from "@/views/module/header";
import Image from "@/views/components/Image";
import World from "@/views/components/World";
import CabinetItem from './CabinetItem';
import Card, { CardCoverItem } from './Card';
import classNames from "classnames";
import { RouteComponentProps } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/user";
import CardModal from "@/views/modal/card";
import { Button } from "antd";

injectGlobal`
@keyframes rotate-clockwise {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes rotate-anti-clockwise {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0);
  }
}
`;

const style = css`
  width: 100vw;
  min-height: 100vh;
  background-color: #000;
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
  const [cardModalVisible, setCardModalVisible] = useState(false);

  const addCard = useCallback(() => {
    setCardModalVisible(true);
  }, [])

  const cardCoverData: { onClick?: React.MouseEventHandler<HTMLDivElement>, covers?: CardCoverItem[] }[] = useMemo(() => [
    {
      covers: [
        {
          type: "img",
          url: "https://tse1-mm.cn.bing.net/th/id/R-C.e77ca14f3c60f938f309bc1cbefa385f?rik=ftyV7Ig2nMg5Iw&riu=http%3a%2f%2fwww.momatek.com%2fu%2fcms%2fwww%2f202006%2f22085637okg4.jpg&ehk=mK0Rzu1MzEW%2f9gDBiC3B2RuX4D9wXP5cNnE4NFJR3GY%3d&risl=&pid=ImgRaw&r=0",
          width: 100,
          height: 100
        },
        {
          type: "img",
          url: "https://static001.infoq.cn/resource/image/5b/fb/5b3158286ff61bc7115485043ae9fffb.png",
          width: 100,
          x: 0,
          y: 20,
          z: "20px"
        },
        {
          type: "text",
          content: "Nginx",
          width: 100,
          y: 60,
          z: "15px",
          textStyle: {
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "2vw"
          }
        }
      ]
    },
    {
      onClick: addCard,
      covers: [
        {
          type: "text",
          content: "+",
          y: 30,
          width: 100,
          z: "30px",
          textStyle: {
            fontSize: 70,
            fontWeight: "bold",
            color: "rgba(0, 0, 0, .7)",
            textAlign: "center"
          }
        }
      ]
    }
  ], [])

  return (
    <div className={classNames([style])}>
      <Header />
      <CardModal visible={cardModalVisible} />
      <World className="absolute top-0 w-screen h-screen overflow-y-auto pt-40">
        <CabinetItem className="space-x-5 overflow-x-auto">
          {cardCoverData.map((item, i) => <Card key={i} className="cursor-pointer" onClick={item.onClick} covers={item.covers}></Card>)}
        </CabinetItem>
        <CabinetItem></CabinetItem>
        <CabinetItem></CabinetItem>
      </World>
    </div>
  );
};

export default Home;
