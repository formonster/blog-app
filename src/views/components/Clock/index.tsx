import React, { useEffect, useState } from "react";
import CubeRounded from "@/views/components/CubeRounded";
import { css } from "@emotion/css";

const clockStyle = css``;

interface ClockProps {
  width?: number;
  height?: number;
  depth?: number;
  style?: React.CSSProperties;
}

function makeUp(time: number) {
  return time.toString().padStart(2, "0");
}

const Clock: React.FC<ClockProps> = function ({
  width = 10,
  height = 5,
  depth = 3,
  style = {},
}) {
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });

  useEffect(() => {
    setInterval(() => {
      const nowDate = new Date();
      setTime({
        hour: nowDate.getHours(),
        minute: nowDate.getMinutes(),
        second: nowDate.getSeconds(),
      });
    }, 1000);
  }, []);

  return (
    <CubeRounded
      className={clockStyle}
      unit="vw"
      radius={2}
      radiusDirection="z"
      faceStyle={{
        backgroundColor: "#000",
        border: "1px solid rgba(255,255,255,.2)",
      }}
      width={width}
      height={height}
      depth={depth}
      style={style}
      faceBottom={{
        style: {
          boxShadow: "1vw -1vw 1.8vw 1.5vw rgba(0, 0, 0, .3)",
        },
      }}
      faceFront={{
        content: (
          <div className="absolute w-full h-full text-white flex justify-center items-center">
            <p className="clock-text" style={{ fontSize: `${width * 0.15}vw` }}>
              {makeUp(time.hour)} : {makeUp(time.minute)} :{" "}
              {makeUp(time.second)}
            </p>
          </div>
        ),
      }}
    />
  );
};
export default Clock;
