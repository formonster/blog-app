import React from 'react';
import { css } from "@emotion/css";
import { Block, GridData } from "@/views/components/Grid";
import classNames from 'classnames';

export type BlockItemProps = {
    className?: string
    onDoubleClick?: React.MouseEventHandler<HTMLDivElement>
    name: string
    data: GridData
    output?: (data: GridData) => void
}

const BlockItem: React.FC<BlockItemProps> = function ({ name, data, output, onDoubleClick }) {

    const onClickItemHandler = () => {
        const _data = { ...data };
        _data.active = !_data.active;
        if (output) output(_data);
    }

    return (
        <div
            onDoubleClick={onDoubleClick}
            onClick={onClickItemHandler}
            className={classNames([
                "p-2 border-b-2 hover:bg-blue-700 hover:text-white cursor-pointer",
                data.active && "bg-blue-800 text-white"])}>
            {name}
        </div>
    )
}
export default BlockItem;