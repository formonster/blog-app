import React, { useEffect, useState } from "react";
import Cube from "@/views/components/Cube";
import { css } from "@emotion/css";

const clockStyle = css``;

interface ComputerProps {
  width?: number;
  height?: number;
  depth?: number;
  style?: React.CSSProperties;
  // handler
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Computer: React.FC<ComputerProps> = function ({
  width = 70,
  height = 35,
  depth = 1,
  style = {},
  onClick,
}) {
  return (
    <Cube
      unit="vw"
      onClick={onClick}
      className="absolute left-0 top-0"
      width={width}
      height={height}
      depth={depth}
      style={style}
      faceStyle={{
        backgroundColor: "#272727",
        border: "1px solid rgba(255, 255, 255, .2)",
      }}
      faceFront={{
        style: {
          border: ".5vw solid #dddddd",
        },
        content: (
          <div className="w-full h-full flex flex-col justify-center items-center bg-white">
            <img className="w-1/3" src="/google_logo.png" alt="" />
            <input
              className="bg-white border-2 border-gray-400 rounded-full shadow w-1/2"
              type="text"
            />
            <p>
              <span className="iconfont icon-aixin"></span>
            </p>
          </div>
        ),
      }}
    />
  );
};
export default Computer;
