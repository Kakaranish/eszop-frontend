import React from 'react';

const DescriptionSection = ({ offer }) => {

    if (!offer) return <></>

    return <>
        <div className="row bg-white mt-3 py-2">
            <div className="col-12 mt-3">
                <h4>Description</h4>
                <p>
                    {offer.description}
                </p>
            </div>
        </div>
    </>
};

export default DescriptionSection;