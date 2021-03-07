import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import KeyValueTable from 'pages/User/Offers/components/KeyValueTable/KeyValueTable';

const columnSettings = {
    key: {
        name: "Key",
        inputSettings: {
            type: "text",
            placeholder: "Key..."
        }
    },
    value: {
        name: "Value",
        inputSettings: {
            type: "text",
            placeholder: "Value..."
        }
    }
};

const ParametersSection = ({ parameters, setParameters }) => {
    return <>
        <div className="bg-white mt-4 mb-4 px-4 pb-4">
            <div className="pt-3 mb-3">
                <h4 className="d-inline">
                    Parameters
                </h4>

                <FontAwesomeIcon icon={faQuestionCircle}
                    className="ml-2 align-baseline"
                    style={{ color: 'lightgray', marginLeft: '2px' }}
                    size={'1x'}
                    data-tip="Click enter in last row to add new"
                />

                <div className="text-muted mb-3" style={{ fontSize: '0.85rem' }}>
                    Put here key-value pairs that describe offer
                    </div>
            </div>

            <KeyValueTable
                data={parameters}
                setData={setParameters}
                columnSettings={columnSettings}
            />

            <div className="col-12 text-secondary">
                Entries with at least 1 empty value are ignored
            </div>
        </div>
    </>
};

export default ParametersSection;