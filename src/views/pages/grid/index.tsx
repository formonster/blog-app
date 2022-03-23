import React, { FC, useEffect, useState } from "react";
import GridEdit from "@/views/components/GridEdit";
import GridLayer from "@/views/components/GridEdit/GridLayer";
import { GridData, UnitType } from "@/views/components/Grid";
import { isWindow } from "@/utils/check";
import { cloneDeep } from "lodash";

function getCacheBaseData(): GridData | false {
    if (isWindow()) {
        // @ts-ignore
        const cache = localStorage.getItem('defaultBaseData')
        if (cache) return JSON.parse(cache);
    }
    return false;
}

function setCacheBaseData(cacheData: GridData) {
    if (isWindow()) {
        try {
            // @ts-ignore
            localStorage.setItem('defaultBaseData', JSON.stringify(cacheData))
        } catch (error) {
            console.error("缓存失败");
            console.error("缓存失败 data", cacheData);
            console.error("缓存失败 error", error);
        }
    }
}

const defaultBaseData: GridData = getCacheBaseData() || {
    gridLayout: {
        rows: [{ height: 1, unit: UnitType.FR }],
        columns: [{ width: 1, unit: UnitType.FR }],
    },
    active: true
}

const Home: FC = function () {

    const [gridLayout, setGridLayout] = useState<GridData>(defaultBaseData)

    const setGridLayoutHandler = (data: GridData) => {
        delete data.gridLayout.areas;
        console.log('setGridLayoutHandler', data);
        setGridLayout({ ...data });
    }

    useEffect(() => {
        const _gridLayout = cloneDeep(gridLayout)
        // areas 中有循环引用，且每次都会重新生成，所以不用缓存
        setCacheBaseData(_gridLayout);
    }, [gridLayout])

    return (
        <div className="w-screen h-screen flex">
            <GridLayer className="w-1/6 border-r-2 h-screen overflow-auto" data={gridLayout} output={setGridLayoutHandler} />
            <GridEdit active={gridLayout.active} className="w-full" name="root" data={gridLayout} output={setGridLayoutHandler} />
        </div>
    );
};

export default Home;
