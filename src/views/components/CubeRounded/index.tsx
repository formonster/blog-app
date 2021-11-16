import React, { useCallback } from "react";
import { css } from "@emotion/css";
import Cylinder, { CylinderProps } from "@/views/components/Cylinder";

const cubeStyle = css`
  transform-style: preserve-3d;

  .face {
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: rgb(116, 116, 116);
  }
  .no-x-border {
    border-left-color: transparent !important;
    border-right-color: transparent !important;
  }
`;

interface CubeProps {
  className?: string;
  unit?: "px" | "vw" | "%";
  // 面的朝向，默认Z轴向外
  inset?: boolean;
  // 默认处于 Y 轴的边设为圆角
  radiusDirection?: "x" | "y" | "z";
  width: number;
  height: number;
  depth: number;
  radius?: number;
  style?: React.CSSProperties;
  faceStyle?: React.CSSProperties;
  faceTop?: {
    style?: React.CSSProperties;
    content?: React.ReactNode;
  };
  faceBottom?: {
    style?: React.CSSProperties;
    content?: React.ReactNode;
  };
  faceLeft?: {
    style?: React.CSSProperties;
    content?: React.ReactNode;
  };
  faceRight?: {
    style?: React.CSSProperties;
    content?: React.ReactNode;
  };
  faceFront?: {
    style?: React.CSSProperties;
    content?: React.ReactNode;
  };
  faceAfter?: {
    style?: React.CSSProperties;
    content?: React.ReactNode;
  };
}

function removeStyle(style: React.CSSProperties): React.CSSProperties {
  const _style = { ...style };
  _style.borderWidth = "0";
  _style.borderColor = "transparent";
  _style.backgroundColor = "transparent";
  return _style;
}

function machiningCylinderStyle(
  style: React.CSSProperties
): React.CSSProperties {
  const _style = { ...style };
  _style.borderLeftWidth = 0;
  _style.borderRightWidth = 0;
  return _style;
}

const Cube: React.FC<CubeProps> = function ({
  unit = "px",
  inset = false,
  radiusDirection = "y",
  className = "",
  radius = 0,
  width,
  height,
  depth,
  style,
  faceStyle,
  faceTop = { style: {} },
  faceBottom = { style: {} },
  faceLeft = { style: {} },
  faceRight = { style: {} },
  faceFront = { style: {} },
  faceAfter = { style: {} },
  children,
}) {
  const createSize = useCallback(
    (size) => {
      return size + unit;
    },
    [unit]
  );

  // 圆角宽度不能大于边长的一半
  if (radiusDirection === "x" && radius > height / 2) radius = height / 2;
  if (radiusDirection === "y" && radius > depth / 2) radius = depth / 2;
  if (radiusDirection === "z" && radius > height / 2) radius = height / 2;

  const cylinderWidth = radius * 2;
  const cylinderStyle = removeStyle(faceStyle);
  const unCylinderStyle = machiningCylinderStyle(faceStyle);

  // 获取圆角的位置
  const getCylinderPosition = useCallback(
    (index): CylinderProps => {
      switch (index) {
        case 0:
          if (radiusDirection == "x") {
            return {
              className: "absolute left-0 top-0",
              width: cylinderWidth,
              height: width,
              clip: [0.7],
              style: {
                left: "50%",
                transform: `translate(-50%, -50%) rotateZ(90deg) translateX(${createSize(
                  cylinderWidth / 2
                )})`,
              },
            };
          }
          if (radiusDirection == "y") {
            return {
              className: "absolute left-0 top-0",
              width: cylinderWidth,
              height: height,
              clip: [0.7],
            };
          }
          if (radiusDirection == "z") {
            const ty = depth / 2 - cylinderWidth / 2;
            return {
              className: "absolute left-0 top-0",
              width: cylinderWidth,
              height: depth,
              clip: [0.7],
              style: {
                transform: `translateZ(${createSize(
                  depth / 2 - cylinderWidth / 2
                )}) translateY(${createSize(-ty)}) rotateX(-90deg)`,
              },
            };
          }
          break;
        case 1:
          if (radiusDirection == "x") {
            return {
              className: "absolute left-0 top-0",
              width: cylinderWidth,
              height: width,
              clip: [0.4, 0.8],
              style: {
                left: "50%",
                transform: `translate(-50%, -50%) translateZ(${createSize(
                  depth - cylinderWidth
                )}) rotateZ(90deg) translateX(${createSize(
                  cylinderWidth / 2
                )})`,
              },
            };
          }
          if (radiusDirection == "y") {
            return {
              className: "absolute left-0 top-0",
              width: cylinderWidth,
              height: height,
              clip: [0.4, 0.8],
              style: {
                transform: `translateZ(${createSize(depth - cylinderWidth)})`,
              },
            };
          }
          if (radiusDirection == "z") {
            return {
              className: "absolute left-0 bottom-0",
              width: cylinderWidth,
              height: depth,
              clip: [0.4, 0.8],
              style: {
                transform: `translateZ(${createSize(
                  depth / 2 - cylinderWidth / 2
                )}) translateY(${createSize(
                  depth / 2 - cylinderWidth / 2
                )}) rotateX(-90deg)`,
              },
            };
          }
          break;
        case 2:
          if (radiusDirection == "x") {
            return {
              className: "absolute left-0 bottom-0",
              width: cylinderWidth,
              height: width,
              clip: [0.7],
              style: {
                left: "50%",
                transform: `translate(-50%, 50%) rotateZ(-90deg) translateX(${createSize(
                  cylinderWidth / 2
                )})`,
              },
            };
          }
          if (radiusDirection == "y") {
            return {
              className: "absolute right-0 top-0",
              width: cylinderWidth,
              height: height,
              clip: [-0.1, 0.3],
            };
          }
          if (radiusDirection == "z") {
            const ty = depth / 2 - cylinderWidth / 2;
            return {
              className: "absolute right-0 top-0",
              width: cylinderWidth,
              height: depth,
              clip: [-0.1, 0.3],
              style: {
                transform: `translateZ(${createSize(
                  depth / 2 - cylinderWidth / 2
                )}) translateY(${createSize(-ty)}) rotateX(-90deg)`,
              },
            };
          }
          break;
        case 3:
          if (radiusDirection == "x") {
            return {
              className: "absolute left-0 bottom-0",
              width: cylinderWidth,
              height: width,
              clip: [0.4, 0.8],
              style: {
                left: "50%",
                transform: `translate(-50%, 50%) translateZ(${createSize(
                  depth - cylinderWidth
                )}) rotateZ(-90deg) translateX(${createSize(
                  cylinderWidth / 2
                )})`,
              },
            };
          }
          if (radiusDirection == "y") {
            return {
              className: "absolute right-0 top-0",
              width: cylinderWidth,
              height: height,
              clip: [0.2, 0.5],
              style: {
                transform: `translateZ(${createSize(depth - cylinderWidth)})`,
              },
            };
          }
          if (radiusDirection == "z") {
            return {
              className: "absolute right-0 bottom-0",
              width: cylinderWidth,
              height: depth,
              clip: [0.2, 0.5],
              style: {
                transform: `translateZ(${createSize(
                  depth / 2 - cylinderWidth / 2
                )}) translateY(${createSize(
                  depth / 2 - cylinderWidth / 2
                )}) rotateX(-90deg)`,
              },
            };
          }
          break;
      }
    },
    [width, height, depth, radiusDirection]
  );

  return (
    <div
      className={`${cubeStyle} ${className}`}
      style={{
        ...style,
        width: createSize(width),
        height: createSize(height),
      }}
    >
      <Cylinder
        {...getCylinderPosition(0)}
        unit={unit}
        faceStyle={unCylinderStyle}
        topFaceStyle={cylinderStyle}
        bottomFaceStyle={cylinderStyle}
      />
      <Cylinder
        {...getCylinderPosition(1)}
        unit={unit}
        faceStyle={unCylinderStyle}
        topFaceStyle={cylinderStyle}
        bottomFaceStyle={cylinderStyle}
      />
      <Cylinder
        {...getCylinderPosition(2)}
        unit={unit}
        faceStyle={unCylinderStyle}
        topFaceStyle={cylinderStyle}
        bottomFaceStyle={cylinderStyle}
      />
      <Cylinder
        {...getCylinderPosition(3)}
        unit={unit}
        faceStyle={unCylinderStyle}
        topFaceStyle={cylinderStyle}
        bottomFaceStyle={cylinderStyle}
      />
      <div
        className="face face-top"
        style={{
          ...faceStyle,
          ...faceTop.style,
          width: {
            x: createSize(width),
            y: createSize(width),
            z: createSize(width - radius * 2),
          }[radiusDirection],
          height: {
            x: createSize(depth - radius * 2),
            y: createSize(depth),
            z: createSize(depth),
          }[radiusDirection],
          borderRadius: radiusDirection === "y" && createSize(radius),
          transform: `translate(-50%, -50%) translateZ(${createSize(
            depth / 2
          )}) rotateX(${inset ? "" : "-"}90deg) translateZ(${
            inset ? "" : "-"
          }${createSize(height / 2)})`,
          ...(radiusDirection === "x"
            ? { borderTopWidth: 0, borderBottomWidth: 0 }
            : {}),
          ...(radiusDirection === "z"
            ? { borderLeftWidth: 0, borderRightWidth: 0 }
            : {}),
        }}
      >
        {(faceTop && faceTop.content) || ""}
      </div>
      <div
        className="face face-bottom style-3d"
        style={{
          ...faceStyle,
          ...faceBottom.style,
          width: {
            x: createSize(width),
            y: createSize(width),
            z: createSize(width - radius * 2),
          }[radiusDirection],
          height: {
            x: createSize(depth - radius * 2),
            y: createSize(depth),
            z: createSize(depth),
          }[radiusDirection],
          borderRadius: radiusDirection === "y" && createSize(radius),
          transform: `translate(-50%, -50%) translateZ(${createSize(
            depth / 2
          )}) rotateX(${inset ? "" : "-"}90deg) translateZ(${
            inset ? "-" : ""
          }${createSize(height / 2)})`,
          ...(radiusDirection === "x"
            ? { borderTopWidth: 0, borderBottomWidth: 0 }
            : {}),
          ...(radiusDirection === "z"
            ? { borderLeftWidth: 0, borderRightWidth: 0 }
            : {}),
        }}
      >
        {(faceBottom && faceBottom.content) || ""}
      </div>
      <div
        className="face face-left no-x-border"
        style={{
          ...faceStyle,
          ...faceLeft.style,
          width: {
            x: createSize(depth),
            y: createSize(depth - radius * 2),
            z: createSize(depth),
          }[radiusDirection],
          height: {
            x: createSize(height),
            y: createSize(height),
            z: createSize(height - radius * 2),
          }[radiusDirection],
          borderRadius: radiusDirection === "x" && createSize(radius),
          transform: `translate(-50%, -50%) translateZ(${createSize(
            depth / 2
          )}) rotateY(${inset ? "" : "-"}90deg) translateZ(${
            inset ? "-" : ""
          }${createSize(width / 2)})`,
          ...(radiusDirection === "z"
            ? { borderTopWidth: 0, borderBottomWidth: 0 }
            : {}),
        }}
      >
        {(faceLeft && faceLeft.content) || ""}
      </div>
      <div
        className="face face-right no-x-border"
        style={{
          ...faceStyle,
          ...faceRight.style,
          width: {
            x: createSize(depth),
            y: createSize(depth - radius * 2),
            z: createSize(depth),
          }[radiusDirection],
          height: {
            x: createSize(height),
            y: createSize(height),
            z: createSize(height - radius * 2),
          }[radiusDirection],
          borderRadius: radiusDirection === "x" && createSize(radius),
          transform: `translate(-50%, -50%) translateZ(${createSize(
            depth / 2
          )}) rotateY(${inset ? "-" : ""}90deg) translateZ(${
            inset ? "-" : ""
          }${createSize(width / 2)})`,
          ...(radiusDirection === "z"
            ? { borderTopWidth: 0, borderBottomWidth: 0 }
            : {}),
        }}
      >
        {(faceRight && faceRight.content) || ""}
      </div>
      <div
        className="face face-front no-x-border"
        style={{
          ...faceStyle,
          ...faceFront.style,
          width: {
            x: createSize(width),
            y: createSize(width - radius * 2),
            z: createSize(width),
          }[radiusDirection],
          height: {
            x: createSize(height - radius * 2),
            y: createSize(height),
            z: createSize(height),
          }[radiusDirection],
          borderRadius: radiusDirection === "z" && createSize(radius),
          transform: `translate(-50%, -50%) ${
            inset ? "rotateY(180deg)" : ""
          } translateZ(${inset ? "-" : ""}${createSize(depth)})`,
          ...(radiusDirection === "x"
            ? { borderTopWidth: 0, borderBottomWidth: 0 }
            : {}),
        }}
      >
        {(faceFront && faceFront.content) || ""}
      </div>
      <div
        className="face face-after no-x-border"
        style={{
          ...faceStyle,
          ...faceAfter.style,
          width: {
            x: createSize(width),
            y: createSize(width - radius * 2),
            z: createSize(width),
          }[radiusDirection],
          height: {
            x: createSize(height - radius * 2),
            y: createSize(height),
            z: createSize(height),
          }[radiusDirection],
          borderRadius: radiusDirection === "z" && createSize(radius),
          transform: `translate(-50%, -50%) ${inset ? "" : "rotateY(180deg)"}`,
          ...(radiusDirection === "x"
            ? { borderTopWidth: 0, borderBottomWidth: 0 }
            : {}),
        }}
      >
        {(faceAfter && faceAfter.content) || ""}
      </div>
    </div>
  );
};

export default Cube;
