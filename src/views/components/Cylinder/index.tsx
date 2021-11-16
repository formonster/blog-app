import React, { useCallback } from "react";
import { css } from "@emotion/css";

const cylinderStyle = css`
  transform-style: preserve-3d;

  .face {
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: rgb(116, 116, 116);
  }
`;

export interface CylinderProps {
  className?: string;
  // 通过 clip 把不需要的面削减掉，0-1 的小数，按百分比削减
  clip?: [start: number, end?: number];
  unit?: "px" | "vw" | "%";
  style?: React.CSSProperties;
  faceStyle?: React.CSSProperties;
  topFaceStyle?: React.CSSProperties;
  bottomFaceStyle?: React.CSSProperties;
  //   圆柱体面的个数
  faceNumber?: number;
  width: number;
  height: number;
}

function render(
  index: number,
  startNum: number,
  endNum: number,
  length: number
): boolean {
  if (startNum < 0 && index >= length + startNum) return true;
  return index >= startNum && index < endNum;
}

const Cylinder: React.FC<CylinderProps> = function ({
  style = {},
  clip,
  className = "",
  unit = "px",
  faceStyle = {},
  topFaceStyle = {},
  bottomFaceStyle = {},
  faceNumber = 20,
  width,
  height,
}) {
  if (!clip) clip = [0, 1];
  let [startClip, endClip = 1] = clip;
  // clip 最大为 1
  if (startClip > 1) startClip = 1;
  if (endClip > 1) endClip = 1;

  const startNum: number = Math.round(faceNumber * startClip);
  const endNum: number = Math.round(faceNumber * endClip);

  const createSize = useCallback(
    (size) => {
      return size + unit;
    },
    [unit]
  );

  // 平均角度
  const angle = Math.round(360 / faceNumber);
  const side = (Math.tan((angle * Math.PI) / 180) * width) / 2;

  return (
    <div
      className={`${cylinderStyle} ${className}`}
      style={{
        transformOrigin: `center center ${createSize(width / 2)}`,
        ...style,
        width: createSize(width),
        height: createSize(height),
      }}
    >
      {/* 竖面 */}
      {new Array(faceNumber).fill(0).map(
        (v, i) =>
          render(i, startNum, endNum, faceNumber) && (
            <div
              className="face"
              key={i}
              style={{
                ...faceStyle,
                width: createSize(side),
                height: createSize(height),
                transform: `translate(-50%, -50%) translateZ(${createSize(
                  width / 2
                )}) rotateY(180deg) rotateY(-${
                  angle * (i + 1)
                }deg) translateZ(${createSize(width / 2)})`,
              }}
            ></div>
          )
      )}
      <div
        className="face face-top"
        style={{
          ...faceStyle,
          ...topFaceStyle,
          width: createSize(width),
          height: createSize(width),
          borderRadius: "50%",
          transform: `translate(-50%, -50%) translateZ(${createSize(
            width / 2
          )}) rotateX(90deg) translateZ(${createSize(height / 2)})`,
        }}
      ></div>
      <div
        className="face face-bottom"
        style={{
          ...faceStyle,
          ...bottomFaceStyle,
          width: createSize(width),
          height: createSize(width),
          borderRadius: "50%",
          transform: `translate(-50%, -50%) translateZ(${createSize(
            width / 2
          )}) rotateX(-90deg) translateZ(${createSize(height / 2)})`,
        }}
      ></div>
    </div>
  );
};

export default Cylinder;
