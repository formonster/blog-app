import React, { FC } from "react";
import { css } from "@emotion/css";
import classNames from "classnames";

export type GridEvent = {
  type: string
  data: any;
}

export enum UnitType {
  /** 百分比 */
  PERCENTAGE = "%",
  PX = "px",
  VW = "vw",
  FR = "fr",
}

export type Blocks = (
  | string
  | {
    areaName: string;
    children?: React.ReactNode;
    gridLayout?: GridData;
  }
)[];

export type Block = {
  areaName?: string
  // self?: GridData
  return?: GridData
}

export type GridData = {
  children?: React.ReactNode;
  gridLayout?: {
    rows?: {
      height: number;
      unit: UnitType;
      grid?: GridData;
    }[];
    columns?: {
      width: number;
      unit: UnitType;
      grid?: GridData;
    }[];
    childs?: {
      [key: string]: GridData
    }
    areas?: {
      style: string[][];
    };
  }
  activeItemPath?: string
  style?: React.CSSProperties
  rowStart?: number
  colStart?: number
  rowEnd?: number
  colEnd?: number
  active?: boolean
};

export type GridProps = {
  layoutData: GridData;
  className?: string;
  style?: React.CSSProperties
};

/**
 * 生成 grid-template-areas 样式
 * @param areas 配置参数
 */
function getAreasStyle(areas: GridData['gridLayout']["areas"]): string {
  return `grid-template-areas: "${areas.style
    .map((names) => names.join(" "))
    .join('" "')}";`;
}

/**
 * 生成子节点
 * @param gridData 配置参数
 */
function getAreasNode(gridData: GridData) {
  const hasAreas = !!gridData.gridLayout && !!gridData.gridLayout.areas;
  if (hasAreas) {
    return gridData.gridLayout.areas.blocks.map((name, i) => {
      switch (typeof name) {
        case "string":
          return (
            <div key={name + i} className="grid-item" style={{ gridArea: name }}>
              {name}
            </div>
          );
        case "object":
          const { areaName, self } = name;
          return (
            <div key={areaName} className="grid-item" id={areaName} style={{ gridArea: areaName }}>
              {self.gridLayout && <Grid className="w-full h-full" layoutData={self} />}
              {!self.gridLayout && !self.children && areaName}
            </div>
          );
      }
    });
  } else {
    const { rows, columns } = gridData.gridLayout;
    return Array(rows.length * columns.length)
      .fill(0)
      .map((v, i) => <div key={i} className="grid-item">{i}</div>);
  }
}

const Grid: FC<GridProps> = function ({ className, style, layoutData }) {
  const hasAreas = !!layoutData.gridLayout.areas;

  const _style = css`
    display: grid;
    grid-template-rows: ${layoutData.gridLayout.rows
      .map(({ height, unit }) => height + unit)
      .join(" ")};
    grid-template-columns: ${layoutData.gridLayout.columns
      .map(({ width, unit }) => width + unit)
      .join(" ")};

    /* grid-template-areas */
    ${hasAreas && getAreasStyle(layoutData.gridLayout.areas)}

    grid-auto-rows: 50px;

    .grid-item {
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      font-size: 50px;
    }
  `;

  return <div className={classNames([className, _style])} style={style}>{getAreasNode(layoutData)}</div>;
};

export default Grid;
