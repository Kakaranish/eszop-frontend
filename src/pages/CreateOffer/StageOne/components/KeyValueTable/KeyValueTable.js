import React, { useState } from 'react';
import styled from 'styled-components';
import Table from './Table';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }

  `
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

    const addNewCb = () => setData(prevData => [...prevData, { key: '', value: '' }]);

    return <>
        <button onClick={addNewCb}>
            Add new
        </button>

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