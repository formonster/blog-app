import React, { FC } from "react";
import { css } from "@emotion/css";
import World from "@/views/components/World";
import classNames from "classnames";

const cardWidth = 15;
const cardHeight = "80%";

export type CardCoverItem = {
  type: "text" | "img"
  content?: React.ReactNode
  textStyle?: React.CSSProperties
  url?: string
  /** 百分比 */
  x?: number
  /** 百分比 */
  y?: number
  /** px */
  z?: number | string
  /** 百分比 */
  width?: number
  /** 百分比 */
  height?: number
  rx?: number
  ry?: number
}

type CardProps = {
    className?: string
    style?: React.CSSProperties
    covers: CardCoverItem[]
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

const cardStyle = css`
  width: ${cardWidth}vw;
  height: 100%;
  background-color: rgba(255, 255, 255, .5);
  border-radius: 10px;
  box-shadow: -1px -1px 2px 0 rgba(255, 255, 255, .1),
                      1px 1px 2px 0 rgba(0, 0, 0, .1);
`

function getCoverItem(coverItem: CardCoverItem, i: number) {
  switch (coverItem.type) {
    case "text":
      return <p key={i} style={{
        position: "absolute",
        width: coverItem.width && coverItem.width + "%",
        height: coverItem.height && coverItem.height + "%",
        left: coverItem.x + "%",
        top: coverItem.y + "%",
        userSelect: "none",
        transform: `translateZ(${coverItem.z}) rotateX(${coverItem.rx || 0}deg) rotateY(${coverItem.ry || 0}deg)`,
        ...coverItem.textStyle,
      }}>{coverItem.content}</p>
    case "img":
      return <img key={i} className="d3" src={coverItem.url} style={{
        position: "absolute",
        objectFit: "cover",
        width: coverItem.width && coverItem.width + "%",
        height: coverItem.height && coverItem.height + "%",
        left: coverItem.x + "%",
        top: coverItem.y + "%",
        userSelect: "none",
        borderRadius: "10px",
        transform: `translateZ(${coverItem.z}) rotateX(${coverItem.rx || 0}deg) rotateY(${coverItem.ry || 0}deg)`
      }} alt="" />
  }
}

const Card: FC<CardProps> = function ({ className, style, covers, onClick }) {
    return (
      <World hover={{ angle: 10 }} style={{ width: cardHeight + "vw", height: cardHeight }}>
        <div onClick={onClick} className={classNames([className, cardStyle, "relative d3"])} style={style}>
          {covers.map(getCoverItem)}
        </div>
      </World>
    )
}

export default Card;
