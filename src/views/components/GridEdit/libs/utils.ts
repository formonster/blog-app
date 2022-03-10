import { GridData, UnitType } from "@/views/components/Grid";

export function getIndexs({ rowStart, colStart, rowEnd, colEnd }: GridData) {
    let ids = [];
    for (let rowIndex = rowStart; rowIndex < rowEnd; rowIndex++) {
        for (let colIndex = colStart; colIndex < colEnd; colIndex++) {
            ids.push(`${rowIndex}x${colIndex}`)
        }
    }
    return ids;
}

export function child2Areas(gridData: GridData) {
    let { rows, columns, childs } = gridData.gridLayout;
    let { blocks, style }: GridData['gridLayout']['areas'] = { style: [], blocks: [] }

    if (!childs) {
        childs = {}
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            for (let colIndex = 0; colIndex < columns.length; colIndex++) {
                childs[`${rowIndex}x${colIndex}`] = {
                    rowStart: rowIndex,
                    rowEnd: rowIndex + 1,
                    colStart: colIndex,
                    colEnd: colIndex + 1
                }
            }
        }
        gridData.gridLayout.childs = childs;
    }

    // 把每个 child 占用的坐标找到，方便生成 style 样式
    let childIndexs: { [key: string]: string } = {}
    if (childs) Object.entries(childs).map(([name, options]) => {
        const indexs = getIndexs(options);
        indexs.forEach(key => {
            childIndexs[key] = name
        })
    })

    // 生成 style 数据
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        style[rowIndex] = []
        for (let colIndex = 0; colIndex < columns.length; colIndex++) {
            const key = `${rowIndex}x${colIndex}`
            // 如果有名字就使用单元格的名字，没有就使用默认的 x y 索引作为名字
            // block 中的元素也会默认使用 x y 索引作为名字
            style[rowIndex].push(childIndexs[key] || key)
        }
    }

    // 生成 blocls 字典，默认直接继承 childs 中的属性，其他没有定义名字的直接使用索引
    // 这里用于快速查询每个 block 对应的 child 属性
    let blockDic = { ...childs };
    style.flat().forEach(key => {
        if (blockDic[key]) return
        blockDic[key] = {}
    })

    // 生成新的 blocks
    blocks = Object.entries(blockDic).map(([areaName, value], i) => {
        // 找到旧的 block，需要继承里面的属性
        return {
            areaName
        }
    })
    gridData.gridLayout.areas = { style, blocks }
}

export const defaultGridData: GridData = {
    gridLayout: {
        rows: [{ height: 1, unit: UnitType.FR }],
        columns: [{ width: 1, unit: UnitType.FR }],
    }
}