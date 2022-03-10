import React, { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { popups } from "@/store/popup";
import asyncComponent from "@/views/components/AsyncComponent";

const popupsComponent: { [key: string]: React.ReactNode } = {
    table: asyncComponent(() => import('./childs/table')),
    axis: asyncComponent(() => import('./childs/axis')),
    area: asyncComponent(() => import('./childs/area')),
    demo: asyncComponent(() => import('./childs/demo')),
}

const Popup: FC<{}> = function ({ }) {
    const popupsData = useRecoilValue(popups)
    return (
        <>
            {Object.entries(popupsData).map(([key, props], i) => {
                const Popup = popupsComponent[key]
                // @ts-ignore
                return <Popup key={key + i} />
            })}
        </>
    )
}

export default Popup;