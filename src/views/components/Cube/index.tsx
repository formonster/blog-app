import React, { useCallback } from "react";
import { css } from "@emotion/css";

const cubeStyle = css`
  transform-style: preserve-3d;

  .face {
    position: absolute;
    left: 50%;
    top: 50%;
    transform-style: preserve-3d;
  }
`;

interface CubeProps {
  className?: string;
  unit?: "px" | "vw" | "%";
  // 面的朝向，默认Z轴向外
  inset?: boolean;
  width: number;
  height: number;
  depth: number;
  style?: React.CSSProperties;
  faceStyle?: React.CSSProperties;
  faceTop?: {
    className?: string;
    style?: React.CSSProperties;
    content?: React.ReactNode;
  };
  faceBottom?: {
    className?: string;
    style?: React.CSSProperties;
    content?: React.ReactNode;
  };
  faceLeft?: {
    className?: string;
    style?: React.CSSProperties;
    content?: React.ReactNode;
  };
  faceRight?: {
    className?: string;
    style?: React.CSSProperties;
    content?: React.ReactNode;
  };
  faceFront?: {
    className?: string;
    style?: React.CSSProperties;
    content?: React.ReactNode;
  };
  faceAfter?: {
    className?: string;
    style?: React.CSSProperties;
    content?: React.ReactNode;
  };
  // handler
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const defaultFace = { className: "", style: {}, content: "" };

const Cube: React.FC<CubeProps> = function ({
  unit = "px",
  inset = false,
  className = "",
  width,
  height,
  depth,
  style,
  faceStyle,
  faceTop = defaultFace,
  faceBottom = defaultFace,
  faceLeft = defaultFace,
  faceRight = defaultFace,
  faceFront = defaultFace,
  faceAfter = defaultFace,
  onClick,
}) {
  const createSize = useCallback(
    (size) => {
      return size + unit;
    },
    [unit]
  );

  return (
    <div
      className={`${cubeStyle} ${className}`}
      onClick={onClick}
      style={{
        ...style,
        width: createSize(width),
        height: createSize(height),
      }}
    >
      <div
        className={`face face-top ${faceTop.className}`}
        style={{
          ...faceStyle,
          ...faceTop.style,
          width: createSize(width),
          height: createSize(depth),
          transform: `translate(-50%, -50%) translateZ(${createSize(
            depth / 2
          )}) rotateX(${inset ? "-" : ""}90deg) translateZ(${
            inset ? "-" : ""
          }${createSize(height / 2)})`,
        }}
      >
        {faceTop.content}
      </div>
      <div
        className={`face face-bottom style-3d ${faceBottom.className}`}
        style={{
          ...faceStyle,
          ...faceBottom.style,
          width: createSize(width),
          height: createSize(depth),
          transform: `translate(-50%, -50%) translateZ(${createSize(
            depth / 2
          )}) rotateX(${inset ? "" : "-"}90deg) translateZ(${
            inset ? "-" : ""
          }${createSize(height / 2)})`,
        }}
      >
        {faceBottom.content}
      </div>
      <div
        className={`face face-left ${faceLeft.className}`}
        style={{
          ...faceStyle,
          ...faceLeft.style,
          width: createSize(depth),
          height: createSize(height),
          transform: `translate(-50%, -50%) translateZ(${createSize(
            depth / 2
          )}) rotateY(${inset ? "" : "-"}90deg) translateZ(${
            inset ? "-" : ""
          }${createSize(width / 2)})`,
        }}
      >
        {faceLeft.content}
      </div>
      <div
        className={`face face-right ${faceRight.className}`}
        style={{
          ...faceStyle,
          ...faceRight.style,
          width: createSize(depth),
          height: createSize(height),
          transform: `translate(-50%, -50%) translateZ(${createSize(
            depth / 2
          )}) rotateY(${inset ? "-" : ""}90deg) translateZ(${
            inset ? "-" : ""
          }${createSize(width / 2)})`,
        }}
      >
        {faceRight.content}
      </div>
      <div
        className={`face face-front ${faceFront.className}`}
        style={{
          ...faceStyle,
          ...faceFront.style,
          width: createSize(width),
          height: createSize(height),
          transform: `translate(-50%, -50%) ${
            inset ? "rotateY(180deg)" : ""
          } translateZ(${inset ? "-" : ""}${createSize(depth)})`,
        }}
      >
        {faceFront.content}
      </div>
      <div
        className={`face face-after ${faceAfter.className}`}
        style={{
          ...faceStyle,
          ...faceAfter.style,
          width: createSize(width),
          height: createSize(height),
          transform: `translate(-50%, -50%) ${inset ? "" : "rotateY(180deg)"}`,
        }}
      >
        {faceAfter.content}
      </div>
    </div>
  );
};

export default Cube;
