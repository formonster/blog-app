import React, { useState } from "react";
import { GridData, UnitType } from "@/views/components/Grid";
import { css } from "@emotion/css";
import classNames from "classnames";
import { Dropdown, Menu } from "antd";
import GridEdit from "./index";
import AxisEdit from "./AxisEdit";
import { usePopupCtl } from "@/store/popup";
import { cloneDeep } from "lodash";

interface AreasEditProps {
    data?: GridData;
    output?: (data: GridData) => void;
}

const areasPrefix = "area_"

/**
 * 生成 grid-template-areas 样式
 * @param areas 配置参数
 */
function getAreasStyle(areas: GridData['gridLayout']["areas"]): string {
    if (!areas || !areas.style) return ""
    return `grid-template-areas: "${areas.style
        .map((names) => names.map(name => areasPrefix + name).join(" "))
        .join('" "')}";`;
}

const AreasEdit: React.FC<AreasEditProps> = function ({ data, output }) {
    const areaPopupCtl = usePopupCtl("area");

    const { childs = {}, areas } = data.gridLayout;
    const { blocks } = areas;

    function onChangeActive(i: number) {
        const _data = cloneDeep(data);
        const areaName = blocks[i].areaName
        _data.gridLayout.childs[areaName].active = !childs[areaName].active;

        output(_data);
    }

    /**
     * 生成子节点
     * @param gridData 配置参数
     */
    function getAreasNode(gridData: GridData) {
        return gridData.gridLayout.areas.blocks.map((block, i) => {
            let { areaName } = block;
            const self = childs[areaName];

            if (self && self.gridLayout) {
                return (
                    <div
                        key={areaName}
                        className={classNames(['grid-item', self.active && 'active'])}
                        id={areaName}
                        style={{ gridArea: areasPrefix + areaName }}>
                        <GridEdit active={self.active} name={areaName} data={self} output={(data) => {
                            childs[areaName] = { ...data }
                            output({ ...gridData })
                        }} />
                    </div>
                )
            }

            return (
                <AxisEdit key={areaName} visible={!!(self && self.active)} output={newGridLayout => {
                    childs[areaName] = { ...childs[areaName], ...newGridLayout };
                    output({ ...gridData })
                }}>
                    <Dropdown
                        overlay={(
                            <Menu>
                                <Menu.Item key="1" onClick={() => {
                                    areaPopupCtl.show({
                                        title: '修改名称',
                                        formData: { name: areaName },
                                        onChange: ({ name }: { name: string }) => {
                                            if (name === areaName) return;

                                            block.areaName = name;
                                            if (!gridData.gridLayout.childs) gridData.gridLayout.childs = {};

                                            if (gridData.gridLayout.childs[areaName]) {
                                                gridData.gridLayout.childs[name] = gridData.gridLayout.childs[areaName]
                                                delete gridData.gridLayout.childs[areaName];
                                                output({ ...data })
                                                return
                                            }

                                            const [x, y] = areaName.split('x');
                                            gridData.gridLayout.childs[name] = {
                                                rowStart: parseInt(x),
                                                rowEnd: parseInt(x) + 1,
                                                colStart: parseInt(y),
                                                colEnd: parseInt(y) + 1,
                                            }
                                            output({ ...data })
                                        },
                                    });
                                }}>
                                    修改名称
                                </Menu.Item>
                            </Menu>
                        )}
                        trigger={['contextMenu']}>
                        <div
                            key={areaName}
                            className={classNames(['grid-item', self && self.active && 'active'])}
                            id={areaName}
                            style={{ gridArea: areasPrefix + areaName }}
                            onClick={onChangeActive.bind(null, i)}>
                            <p className="select-none text-blue-200 text-xl">{areaName}</p>
                        </div>
                    </Dropdown>
                </AxisEdit>
            );
        });
    }

    const gridStyle = css`
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: ${data.gridLayout.rows
            .map(({ height, unit }) => height + unit)
            .join(" ")};
        grid-template-columns: ${data.gridLayout.columns
            .map(({ width, unit }) => width + unit)
            .join(" ")};

        /* grid-template-areas */
        ${getAreasStyle(data.gridLayout.areas)}

        .grid-item {
            border: 1px solid #bfe8ff;
            border-top-width: 0;
            border-left-width: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            font-size: 50px;

            &.active {
                background-color: #00b7ff33;
            }
        }
    `;

    return <div className={gridStyle}>{getAreasNode(data)}</div>;
};

export default AreasEdit;