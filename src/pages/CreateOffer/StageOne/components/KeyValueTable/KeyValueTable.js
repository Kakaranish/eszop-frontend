import React, { useMemo } from 'react';
import styled from 'styled-components';
import Table from './Table';

const Styles = styled.div`
  table {
      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
        width: 100%;
      }
  }`


const KeyValueTable = (props) => {

    const defaultColumnSettings = {
        key: {
            name: "Key",
            inputSettings: {
                type: "text"
            }
        },
        value: {
            name: "Value",
            inputSettings: {
                type: "text"
            }
        }
    };

    const { data, setData, columnSettings = defaultColumnSettings } = props;

    const columns = useMemo(() => [
        {
            Header: columnSettings.key.name,
            accessor: 'key',
        },
        {
            Header: columnSettings.value.name,
            accessor: 'value',
        },
    ], []);

    const updateMyData = (rowIndex, columnId, value) => {
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row;
            })
        )
    }

    return <>
        <Styles>
            <Table
                columns={columns}
                data={data}
                setData={setData}
                updateMyData={updateMyData}
                columnSettings={columnSettings}
            />
        </Styles>
    </>
};

export default KeyValueTable;