import React, { useState } from 'react';
import styled from 'styled-components';
import Table from './Table';

const Styles = styled.div`
  table {
      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
  }`

const KeyValueTable = () => {
    const columns = React.useMemo(() => [
        {
            Header: 'Key',
            accessor: 'key',
        },
        {
            Header: 'Value',
            accessor: 'value',
        },
    ], []);

    const [data, setData] = useState([
        {
            key: 'SomeKey',
            value: 'Some Value'
        },
        {
            key: '',
            value: ''
        }
    ]);

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

    const addNewCb = event => {
        event.preventDefault();

        let lastItem = data.slice(-1)[0];
        if(!lastItem.key || !lastItem.value) return;
        
        setData(prevData => [...prevData, { key: '', value: '' }]);
    };

    return <>
        <Styles>
            <Table
                columns={columns}
                data={data}
                setData={setData}
                updateMyData={updateMyData}
            />
        </Styles>

        <button onClick={addNewCb} className="btn btn-block btn-outline-success">
            Add new
        </button>
    </>
};

export default KeyValueTable;