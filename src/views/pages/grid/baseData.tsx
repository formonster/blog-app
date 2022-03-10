import React, { lazy } from "react";
import { UnitType, GridData, GridDataChild } from "@/views/components/Grid";
import LazyComponent from "@/views/components/LazyComponent";

const GridEdit = lazy(() => import("@/views/components/GridEdit"));

const gridData: GridData = {
  rows: [{ height: 1, unit: UnitType.FR }],
  columns: [{ width: 1, unit: UnitType.FR }],
  active: true
  // childs: {
  //   header: {
  //     rowStart: 0,
  //     colStart: 0,
  //     rowEnd: 1,
  //     colEnd: 2,
  //   },
  //   menu: {
  //     rowStart: 1,
  //     colStart: 0,
  //     rowEnd: 3,
  //     colEnd: 1,
  //   },
  //   content: {
  //     rowStart: 1,
  //     colStart: 1,
  //     rowEnd: 2,
  //     colEnd: 2,
  //     gridLayout: {
  //       rows: [
  //         { height: 1, unit: UnitType.FR },
  //         { height: 1, unit: UnitType.FR },
  //       ],
  //       columns: [
  //         { width: 1, unit: UnitType.FR },
  //         { width: 1, unit: UnitType.FR },
  //       ],
  //     }
  //   },
  // },
};

export default gridData;
