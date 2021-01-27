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

    const {data, setData} = props;

    const columns = useMemo(() => [
        {
            Header: 'Key',
            accessor: 'key',
        },
        {
            Header: 'Value',
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
            />
        </Styles>
    </>
};

export default KeyValueTable;