import React, { FC } from "react";
import { css, injectGlobal } from "@emotion/css";
import Cube from "@/views/components/Cube";
import classNames from "classnames";

type CabinetItemProps = {
    className?: string
    style?: React.CSSProperties
}

const cabinetItemWidth = 70;
const cabinetItemHeight = 30;

// 柜子栏
const cabinetItem = css`
  position: relative;
  width: ${cabinetItemWidth}vw;
  left: ${(100 - cabinetItemWidth) / 2}vw;
  height: ${cabinetItemHeight}vw;

  .cabinetItem-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 1vw 2vw;
    overflow-x: auto;
    transform: translateZ(5vw);
    bottom: 0;
    align-items: center;
  }
`

const faceStyle: React.CSSProperties = {
  backgroundImage: "url('https://tse1-mm.cn.bing.net/th/id/R-C.c652ff4023d25f5266a65786818fd534?rik=FuDkkQa5KHlLOA&riu=http%3a%2f%2fpic.shejiben.com%2fcaizhi%2fday_151203%2f20151203_ca9c33bcf36894dca953svIuYmedKzcY.jpg&ehk=%2fg9%2fmUlg1n1f63o%2bhkL1%2fl8%2bRcCyIaUB1i%2btZ4fXQzM%3d&risl=&pid=ImgRaw&r=0')",
  backgroundSize: "100px 100%"
}

const blackFace8 = { style: { boxShadow: "0 0 100vw 100vw rgba(0, 0, 0, .8) inset" }}
const blackFace7 = { style: { boxShadow: "0 0 100vw 100vw rgba(0, 0, 0, .7) inset" }}
const blackFace6 = { style: { boxShadow: "0 0 100vw 100vw rgba(0, 0, 0, .65) inset" }}
const blackFace5 = { style: { boxShadow: "0 0 100vw 100vw rgba(0, 0, 0, .5) inset" }}

const CabinetItem: FC<CabinetItemProps> = function ({ children, className, style }) {
    return (
        <div className={classNames([cabinetItem, "relative d3"])}>
          <Cube faceStyle={faceStyle} faceFront={blackFace8} className="absolute" unit="vw" width={cabinetItemWidth} height={cabinetItemHeight} depth={1} />
          <Cube faceStyle={faceStyle} faceBottom={blackFace7} faceFront={blackFace5} className="absolute" unit="vw" width={cabinetItemWidth} height={1} depth={10} />
          <Cube faceStyle={faceStyle} faceRight={blackFace6} faceFront={blackFace5} faceLeft={blackFace8} className="absolute" unit="vw" width={1} height={cabinetItemHeight} depth={10} />
          <Cube faceStyle={faceStyle} faceTop={blackFace6} faceFront={blackFace5} className="absolute bottom-0" unit="vw" width={cabinetItemWidth} height={1} depth={10} />
          <Cube faceStyle={faceStyle} faceLeft={blackFace7} faceFront={blackFace5} className="absolute right-0" unit="vw" width={1} height={cabinetItemHeight} depth={10} />

          <div className={classNames(className, "cabinetItem-content flex d3")} style={style}>{children}</div>
        </div>
    )
}

export default CabinetItem;
