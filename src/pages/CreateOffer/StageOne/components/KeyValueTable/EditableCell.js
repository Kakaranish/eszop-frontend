import React, { useEffect, useState } from 'react';

const EditableCell = (props) => {

    const {
        value: initialValue,
        row,
        column,
        updateMyData,
        cell
    } = props;

    const [value, setValue] = useState(cell.value);

    const onChange = e => {
        setValue(_ => {
            updateMyData(row.index, column.id, e.target.value);
            return e.target.value;
        });
    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue]);

    return <>
        <input value={value} onChange={onChange} />
    </>
}

export default EditableCell;