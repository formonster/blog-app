import React, { FC, useState } from "react";
import { GridData, GridEvent, UnitType } from "@/views/components/Grid";
import AxisEdit from "./AxisEdit";
import AreasEdit from "./AreasEdit";
import { areasPrefix } from "./consts";
import { child2Areas, defaultGridData } from "./libs/utils";
import classNames from "classnames";
import { cloneDeep } from "lodash";

export interface GridEditProps {
  name?: string
  active?: boolean
  className?: string
  data?: GridData
  output?: (data: GridData, event?: GridEvent) => void
}

const GridEdit: FC<GridEditProps> = function ({ active = false, name, className, data = defaultGridData, output }) {
  let gridData = cloneDeep(data);
  child2Areas(gridData);

  // console.log(name, "gridData", gridData);

  const onAxisChange = function (data: GridData, event?: GridEvent) {
    if (output) {
      if (event && event.type === 'change-active') {
        // 取消上一个选中的单元格
        if (name === 'root' && data.activeItemPath) {
          let activeChild = data;
          const namePath = data.activeItemPath.split(',')
          namePath.forEach(name => {
            activeChild = activeChild.gridLayout.childs[name]
          })
          activeChild.active = false;
        }
        // 如果到根节点了，就不追加路径了
        if (name !== 'root') event.data.areaName = `${name},${event.data.areaName}`
        // 如果点击了已选中的元素，则清空路径
        if (data.activeItemPath === event.data.areaName) data.activeItemPath = '';
        else data.activeItemPath = event.data.areaName;
      }
      output(cloneDeep(data), event)
    }
  }

  return (
    <div style={{ gridArea: areasPrefix + name}} className={classNames(className, "w-full h-full")}>
      <AxisEdit visible={active} data={gridData} output={onAxisChange}>
        <AreasEdit data={gridData} output={onAxisChange} />
      </AxisEdit>
    </div>
  );
};

export default GridEdit;
