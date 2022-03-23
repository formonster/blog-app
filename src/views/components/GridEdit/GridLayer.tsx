import React from 'react';
import { Block, GridData, UnitType } from "@/views/components/Grid";
import BlockItem from "@/views/components/GridEdit/BlockItem";
import { child2Areas } from './libs/utils';
import { cloneDeep } from 'lodash';
import { usePopupCtl } from '@/store/popup';

export type GridLayerProps = {
    className?: string
    data: GridData
    output?: (data: GridData) => void
}

const GridLayer: React.FC<GridLayerProps> = function ({ className, data, output }) {
    const areaPopupCtl = usePopupCtl('area');

    const gridData = cloneDeep(data);
    child2Areas(gridData)

    const { childs } = gridData.gridLayout;

    const blockChange = (areaName: string, data: GridData) => {
        childs[areaName] = data;
        if (output) output({ ...gridData });
    }

    const onDoubleClickHandler = (areaName: string) => {
        areaPopupCtl.show({
            title: '修改名称',
            formData: { name: areaName },
            onChange: ({ name }: { name: string }) => {
                if (name === areaName) return;

                const data = cloneDeep(gridData);
                data.gridLayout.childs[name] = data.gridLayout.childs[areaName];
                delete data.gridLayout.childs[areaName]
                output(data)
            },
        });
    }

    return (
        <div className={className}>
            {Object.entries(childs).map(([areaName], i) => {
                if (!childs[areaName]) console.log('error', areaName, childs);
                if (childs[areaName] && childs[areaName].gridLayout) {
                    return (
                        <div key={areaName}>
                            <BlockItem key={areaName} name={areaName} data={childs[areaName]} output={blockChange.bind(null, areaName)} onDoubleClick={onDoubleClickHandler.bind(null, areaName)} />
                            <GridLayer className="pl-3 bg-blue-500 bg-opacity-10" data={childs[areaName]} output={newData => {
                                childs[areaName] = newData;
                                output({ ...gridData })
                            }} />
                        </div>
                    )
                }
                return <BlockItem key={areaName} name={areaName} data={childs[areaName]} output={blockChange.bind(null, areaName)} onDoubleClick={onDoubleClickHandler.bind(null, areaName)} />
            })}
        </div>
    );
}
export default GridLayer;