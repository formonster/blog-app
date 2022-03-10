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

    console.log('GridLayer', gridData);

    const { childs, areas } = gridData.gridLayout;
    const { blocks } = areas;

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
            {blocks.map((block, i) => {
                if (!childs[block.areaName]) console.log('error', block.areaName, childs);
                if (childs[block.areaName] && childs[block.areaName].gridLayout) {
                    return (
                        <div key={block.areaName}>
                            <BlockItem key={block.areaName} name={block.areaName} data={childs[block.areaName]} output={blockChange.bind(null, block.areaName)} onDoubleClick={onDoubleClickHandler.bind(null, block.areaName)} />
                            <GridLayer className="pl-3 bg-blue-500 bg-opacity-10" data={childs[block.areaName]} output={newData => {
                                childs[block.areaName] = newData;
                                output({ ...gridData })
                            }} />
                        </div>
                    )
                }
                return <BlockItem key={block.areaName} name={block.areaName} data={childs[block.areaName]} output={blockChange.bind(null, block.areaName)} onDoubleClick={onDoubleClickHandler.bind(null, block.areaName)} />
            })}
        </div>
    );
}
export default GridLayer;