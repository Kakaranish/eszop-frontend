import React from 'react';

const ParametersSection = ({ offer }) => {
    if (!offer?.keyValueInfos?.length) return <></>

    return <div className="row bg-white mt-3 py-2">
        <div className="col-12 mt-3">
            <h4 className="mb-3">Parameters</h4>
            <table class="table table-hover">
                <tbody>
                    {
                        offer.keyValueInfos.map(keyValueInfo => <>
                            <tr>
                                <td>{keyValueInfo.key}</td>
                                <td>{keyValueInfo.value}</td>
                            </tr>
                        </>)
                    }
                </tbody>
            </table>
        </div>
    </div>
};

export default ParametersSection;