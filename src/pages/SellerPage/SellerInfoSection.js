import React from 'react';

const SellerInfoSection = ({ sellerInfo }) => {
    return <>
        {
            sellerInfo.contactEmail &&
            <div>
                <b>Contact email:</b>&nbsp;
                    {sellerInfo.contactEmail}
            </div>
        }

        {
            sellerInfo.phoneNumber &&
            <div>
                <b>Phone number:  </b>
                {sellerInfo.phoneNumber}
            </div>
        }

        {
            sellerInfo.additionalInfo &&
            <div>
                <b>Additional info: </b><br />
                {sellerInfo.additionalInfo}
            </div>
        }
    </>
};

export default SellerInfoSection;