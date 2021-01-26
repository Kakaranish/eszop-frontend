import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from "react-dnd"
import dragIcon from 'assets/img/drag-indicator.svg';
import xSymbol from 'assets/img/close.svg';

const Row = ({ row, index, moveRow, setData }) => {

    const DND_ITEM_TYPE = 'row'

    const dropRef = useRef(null)
    const dragRef = useRef(null)

    const [, drop] = useDrop({
        accept: DND_ITEM_TYPE,
        hover(item, monitor) {
            if (!dropRef.current) return;

            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = dropRef.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            moveRow(dragIndex, hoverIndex)

            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: DND_ITEM_TYPE, index },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    const opacity = isDragging ? 0 : 1;

    preview(drop(dropRef));
    drag(dragRef);

    const removeOnClick = row => setData(prevData =>
        prevData.slice(0, row.index).concat(prevData.slice(row.index + 1)));

    const [deleteBtnStyle, setDeleteBtnStyle] = useState({ width: '20px', opacity: 0 });

    return (
        <tr ref={dropRef} style={{ opacity }}
            onMouseEnter={() => setDeleteBtnStyle(prev => ({ ...prev, opacity: 1 }))}
            onMouseLeave={() => setDeleteBtnStyle(prev => ({ ...prev, opacity: 0 }))}
        >
            <td style={{ border: "1px" }} ref={dragRef}>
                <img src={dragIcon} />
            </td>

            {
                row.cells.map((cell, cellIndex) => {
                    if (cellIndex == row.cells.length - 1) {
                        return <td {...cell.getCellProps()} style={{ borderRight: '0px' }}>
                            {cell.render('Cell')}
                        </td>
                    }
                    return <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                    </td>
                })
            }

            <td style={{ border: "0px", cursor: 'pointer' }}
                onClick={() => removeOnClick(row)}>
                <img src={xSymbol} style={deleteBtnStyle} />
            </td>
        </tr>
    )
}

export default Row;