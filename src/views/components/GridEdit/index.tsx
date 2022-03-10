import React, { FC, useState } from "react";
import { GridData, UnitType } from "@/views/components/Grid";
import AxisEdit from "./AxisEdit";
import AreasEdit from "./AreasEdit";
import { child2Areas, defaultGridData } from "./libs/utils";
import classNames from "classnames";
import { cloneDeep } from "lodash";

export interface GridEditProps {
  name?: string
  active?: boolean
  className?: string
  data?: GridData
  output?: (data: GridData) => void
}

const GridEdit: FC<GridEditProps> = function ({ active = false, name, className, data = defaultGridData, output }) {
  let gridData = cloneDeep(data);
  child2Areas(gridData);

  console.log(name, "gridData", gridData);

  const onAxisChange = function (data: GridData) {
    if (output) output(cloneDeep(data))
  }

  return (
    <div className={classNames(className, "w-full h-full")}>
      <AxisEdit visible={active} data={gridData} output={onAxisChange}>
        <AreasEdit data={gridData} output={onAxisChange} />
      </AxisEdit>
    </div>
  );
};

export default GridEdit;
