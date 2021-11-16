import { css } from "@emotion/css";
import classNames from "classnames";
import React, { useState, useEffect, useRef } from "react";

const style = css`
  position: relative;
  width: 100%;

  .com-separate__line {
    position: absolute;
    top: 0;
    width: 10px;
    height: 100%;
    cursor: col-resize;
    z-index: 2;
    user-select: none;
    background-color: rgb(232, 232, 232);
  }
`;

const getPadding = (length: number, i: number) => {
  if (i === 0) return { paddingRight: "5px" };
  if (i === length - 1) return { paddingLeft: "5px" };
  return { paddingRight: "5px", paddingLeft: "5px" };
};

function Separate({ items = [], size, onResize }: any) {
  const separate = useRef<any>();
  const length = items.length;
  const [down, setDown] = useState(false);
  const [fullWidth, setFullWidth] = useState<any>(0);
  const [startInfo, setStartInfo] = useState<any>(0);
  const [sizes, setSizes] = useState(
    size || new Array(length).fill(100 / length)
  );

  useEffect(() => {
    // 监听浏览器窗口变化
    window.onresize = () => {
      if (separate.current) setFullWidth(separate.current.offsetWidth);
    };
  }, []);

  useEffect(() => {
    // 初始化组件宽度
    if (separate.current) setFullWidth(separate.current.offsetWidth);
  }, [separate]);

  const onMouseDownHandler = function (index: number, e: any) {
    setDown(true);
    console.log(e.clientX);
    setStartInfo({
      x: e.clientX,
      index,
      size: [sizes[index], sizes[index + 1]],
    });
  };
  const onMouseMoveHandler = function (e: any) {
    if (!down) return;
    const { x, index, size } = startInfo;
    // 移动距离
    const distance = e.clientX - x;
    const move = (distance / fullWidth) * 100;
    sizes[index] = size[0] + move;
    sizes[index + 1] = size[1] - move;
    setSizes([...sizes]);

    if (onResize) onResize([...sizes]);
  };
  const onMouseUpHandler = function (e: any) {
    setDown(false);
  };

  return (
    <div
      className={classNames([style, "flex"])}
      ref={separate}
      onMouseMove={onMouseMoveHandler}
      onTouchMove={onMouseMoveHandler}
      onMouseUp={onMouseUpHandler}
      onTouchEnd={onMouseUpHandler}
    >
      {items.map((item: any, i: number) => (
        <div
          key={i}
          className={(down && "pointer-event-none") || ""}
          style={{
            width: sizes[i] + "%",
            height: "100%",
            ...getPadding(items.length, i),
          }}
        >
          {item}
        </div>
      ))}
      {sizes.map((size: any, i: number) => {
        if (i === length - 1) return;
        let left = size;
        if (i)
          sizes.split(i)[0].forEach((size: any) => (left += parseInt(size)));
        return (
          <div
            key={i}
            className="com-separate__line"
            style={{ left: `calc(${left}% - 5px)` }}
            onTouchStart={onMouseDownHandler.bind(null, i)}
            onMouseDown={onMouseDownHandler.bind(null, i)}
          />
        );
      })}
    </div>
  );
}

export default Separate;
