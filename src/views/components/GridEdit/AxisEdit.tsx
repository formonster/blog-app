import React, { useState } from "react";
import { css } from "@emotion/css";
import { GridData, UnitType } from "@/views/components/Grid";
import { usePopupCtl } from "@/store/popup";
import { cloneDeep } from "lodash";
import { Dropdown, Menu } from "antd";
import { defaultGridData } from "./libs/utils";
import classNames from "classnames";
import { sortDescObjectItem, sortAscObjectItem } from "@/utils/array";

interface AxisEditProps {
    visible?: boolean;
    data?: GridData;
    output?: (data: GridData) => void;
}

const axiosStyle = css`
    width: 100%;
    height: 100%;
    padding: 15px 0 0 15px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 15px;
        height: 15px;
        background-color: rgba(219, 234, 254);
    }
`;

const AxisEdit: React.FC<AxisEditProps> = function ({
    visible = true,
    data = defaultGridData,
    children,
    output,
}) {
    if (!visible) return <>{children}</>

    const axisPopupCtl = usePopupCtl("axis");
    const [rightClickItem, setRightClickItem] = useState<{ type: 'row' | 'col', index: number }>();

    const axiosXStyle = css`
        position: absolute;
        padding-left: 15px;
        top: 0;
        left: 0;
        width: 100%;
        height: 15px;
        max-height: 15px;
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: ${(data.gridLayout.columns)
            .map(({ width, unit }) => width + unit)
            .join(" ")};
  `;

    const axiosYStyle = css`
        position: absolute;
        padding-top: 15px;
        top: 0;
        left: 0;
        width: 15px;
        max-width: 15px;
        height: 100%;
        display: grid;
        grid-template-rows: ${data.gridLayout.rows
            .map(({ height, unit }) => height + unit)
            .join(" ")};
        grid-template-columns: 1fr;
  `;

    const onClickAxisItemHanlder = function (
        axisData: {
            height: number;
            unit: UnitType;
        } | {
            width: number;
            unit: UnitType;
        },
        i: number
    ) {
        const onChangeHandler = (formData: { value: number; unit: UnitType }) => {
            const _data = cloneDeep(data);
            if ("width" in axisData) {
                _data.gridLayout.columns[i] = { width: formData.value, unit: formData.unit };
            } else {
                _data.gridLayout.rows[i] = { height: formData.value, unit: formData.unit };
            }
            output(_data);
        };
        if ("width" in axisData) {
            axisPopupCtl.show({
                title: '修改列宽',
                formData: { value: axisData.width, unit: axisData.unit },
                onChange: onChangeHandler,
            });
        } else {
            axisPopupCtl.show({
                title: '修改行高',
                formData: { value: axisData.height, unit: axisData.unit },
                onChange: onChangeHandler,
            });
        }
    };

    const onMenuVisibleChange = function (type: 'row' | 'col', index: number, visible: boolean) {
        setRightClickItem(visible ? { type, index } : undefined);
    }

    function insertCloumn(index: number, rowNum: number, data: GridData, insertNum: number = 1) {
        if (!data.gridLayout.childs) return;

        // 计算插入的单元格下标
        let insertItems = [];
        for (let x = 0; x < insertNum; x++) {
            for (let i = 0; i < rowNum; i++) {
                insertItems.push(`${i}x${index + x}`);
            }
        }

        // 修改现有的 childs
        const childsArr = sortDescObjectItem(Object.entries(data.gridLayout.childs), '[1].colStart')
        childsArr.forEach(([name, child]) => {
            const indexName = `${child.rowStart}x${child.colStart}`;
            const isIndexName = name === indexName
            if (child.colStart >= index) {
                child.colStart += insertNum;
                child.colEnd += insertNum;
            } else return
            if (isIndexName) {
                if (data.gridLayout.childs[`${child.rowStart}x${child.colStart}`]) {
                    console.error('单元格发生了覆盖，请检查列表：', childsArr)
                    return
                }
                data.gridLayout.childs[`${child.rowStart}x${child.colStart}`] = child;
                delete data.gridLayout.childs[indexName]
            }
        })

        // 添加新元素
        insertItems.forEach(key => {
            const [x, y] = key.split('x');
            data.gridLayout.childs[key] = {
                rowStart: parseInt(x),
                rowEnd: parseInt(x) + 1,
                colStart: parseInt(y),
                colEnd: parseInt(y) + 1,
            }
        })
    }

    function insertRow(index: number, colNum: number, data: GridData, insertNum: number = 1) {
        if (!data.gridLayout.childs) return;

        // 计算插入的单元格下标
        let insertItems = [];
        for (let x = 0; x < insertNum; x++) {
            for (let i = 0; i < colNum; i++) {
                insertItems.push(`${index + x}x${i}`);
            }
        }

        // 修改现有的 childs
        const childsArr = sortDescObjectItem(Object.entries(data.gridLayout.childs), '[1].rowStart')
        childsArr.forEach(([name, child]) => {
            const indexName = `${child.rowStart}x${child.colStart}`;
            const isIndexName = name === indexName
            if (child.rowStart >= index) {
                child.rowStart += insertNum;
                child.rowEnd += insertNum;
            } else return
            if (isIndexName) {
                if (data.gridLayout.childs[`${child.rowStart}x${child.colStart}`]) {
                    console.error('单元格发生了覆盖，请检查列表：', childsArr)
                    return
                }
                data.gridLayout.childs[`${child.rowStart}x${child.colStart}`] = child;
                delete data.gridLayout.childs[indexName]
            }
        })

        // 添加新元素
        insertItems.forEach(key => {
            const [x, y] = key.split('x');
            data.gridLayout.childs[key] = {
                rowStart: parseInt(x),
                rowEnd: parseInt(x) + 1,
                colStart: parseInt(y),
                colEnd: parseInt(y) + 1,
            }
        })
    }

    function removeCloumn(index: number, data: GridData, removeNum: number = 1) {
        if (!data.gridLayout.childs) return;
        Object.entries(data.gridLayout.childs).forEach(([name, child]) => {
            if (child.colStart >= index && child.colEnd <= index + removeNum) {
                delete data.gridLayout.childs[name]
            }
        })

        // 修改现有的 childs
        const childsArr = sortAscObjectItem(Object.entries(data.gridLayout.childs), '[1].colStart')
        childsArr.forEach(([name, child]) => {
            const indexName = `${child.rowStart}x${child.colStart}`;
            const isIndexName = name === indexName
            if (child.colStart > index) {
                child.colStart -= removeNum;
                child.colEnd -= removeNum;
            } else return
            if (isIndexName) {
                if (data.gridLayout.childs[`${child.rowStart}x${child.colStart}`]) {
                    console.error('单元格发生了覆盖，请检查列表：', `${child.rowStart}x${child.colStart}`, childsArr)
                    return
                }
                data.gridLayout.childs[`${child.rowStart}x${child.colStart}`] = child;
                delete data.gridLayout.childs[indexName]
            }
        })
    }

    function removeRow(index: number, data: GridData, removeNum: number = 1) {
        if (!data.gridLayout.childs) return;
        Object.entries(data.gridLayout.childs).forEach(([name, child]) => {
            if (child.rowStart >= index && child.rowEnd <= index + removeNum) {
                delete data.gridLayout.childs[name]
            }
        })

        // 修改现有的 childs
        const childsArr = sortAscObjectItem(Object.entries(data.gridLayout.childs), '[1].rowStart')
        childsArr.forEach(([name, child]) => {
            const indexName = `${child.rowStart}x${child.colStart}`;
            const isIndexName = name === indexName
            if (child.rowStart >= index) {
                child.rowStart -= removeNum;
                child.rowEnd -= removeNum;
            }
            if (isIndexName) {
                if (data.gridLayout.childs[`${child.rowStart}x${child.colStart}`]) {
                    console.error('单元格发生了覆盖，请检查列表：', childsArr)
                    return
                }
                data.gridLayout.childs[`${child.rowStart}x${child.colStart}`] = child;
                delete data.gridLayout.childs[indexName]
            }
        })
    }

    // 向前插入
    const onInsertFront = function () {
        const _data = cloneDeep(data);
        const { type, index } = rightClickItem;
        if (type === 'row') {
            _data.gridLayout.columns.splice(index, 0, { width: 1, unit: UnitType.FR })
            insertCloumn(index, _data.gridLayout.rows.length, _data)
        } else {
            _data.gridLayout.rows.splice(index, 0, { height: 1, unit: UnitType.FR })
            insertRow(index, _data.gridLayout.columns.length, _data)
        }
        if (output) output(_data);
    }

    // 向后插入
    const onInsertAfter = function () {
        const _data = cloneDeep(data);
        const { type, index } = rightClickItem;
        if (type === 'row') {
            _data.gridLayout.columns.splice(index + 1, 0, { width: 1, unit: UnitType.FR })
            insertCloumn(index + 1, _data.gridLayout.rows.length, _data)
        } else {
            _data.gridLayout.rows.splice(index + 1, 0, { height: 1, unit: UnitType.FR })
            insertRow(index + 1, _data.gridLayout.columns.length, _data)
        }
        output(_data);
    }

    const onRemove = function () {
        const _data = cloneDeep(data);
        const { type, index } = rightClickItem;
        if (type === 'row') {
            // 如果已经剩最后一列了，就把整个 gridLayout 删掉
            if (_data.gridLayout.columns.length === 1) {
                delete _data.gridLayout;
                output(_data);
                return;
            }
            _data.gridLayout.columns.splice(index, 1)
            removeCloumn(index, _data)
        } else {
            // 如果已经剩最后一行了，就把整个 gridLayout 删掉
            if (_data.gridLayout.rows.length === 1) {
                delete _data.gridLayout;
                output(_data);
                return;
            }
            _data.gridLayout.rows.splice(index, 1)
            removeRow(index, _data)
        }
        output(_data);
    }

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={onInsertFront}>向前插入</Menu.Item>
            <Menu.Item key="2" onClick={onInsertAfter}>向后插入</Menu.Item>
            <Menu.Item key="3" onClick={onRemove}>删除</Menu.Item>
        </Menu>
    );

    return (
        <div className={axiosStyle}>
            <div className={axiosXStyle}>
                {data.gridLayout.columns.map((v, i) => (
                    <Dropdown
                        key={`${i}_${v.width}${v.unit}`}
                        overlay={menu}
                        trigger={['contextMenu']}
                        onVisibleChange={onMenuVisibleChange.bind(null, 'row', i)}>
                        <div
                            className="bg-blue-100 hover:bg-blue-300 cursor-pointer border-1 border-blue-400 text-xs relative"
                            onClick={onClickAxisItemHanlder.bind(null, v, i)}
                        ><p className="absolute center text-blue-500">{`${v.width}${v.unit}`}</p></div>
                    </Dropdown>
                ))}
            </div>
            <div className={axiosYStyle}>
                {data.gridLayout.rows.map((v, i) => (
                    <Dropdown key={`${i}_${v.height}${v.unit}`} overlay={menu} trigger={['contextMenu']} onVisibleChange={onMenuVisibleChange.bind(null, 'col', i)}>
                        <div
                            className="bg-blue-100 hover:bg-blue-300 cursor-pointer border-1 border-blue-400 text-xs relative vertical-lr"
                            onClick={onClickAxisItemHanlder.bind(null, v, i)}
                        ><p className="absolute center text-blue-500">{`${v.height}${v.unit}`}</p></div>
                    </Dropdown>
                ))}
            </div>
            {children}
        </div>
    );
};
export default AxisEdit;
