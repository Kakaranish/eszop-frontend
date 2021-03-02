import DeliveryAddressForm from 'common/components/DeliveryAddressForm';
import React from 'react';

const DeliveryAddressesSection = ({order}) => {
    return <>
        <div>
            <h4>Delivery address</h4>

            <DeliveryAddressForm
                deliveryAddress={order.deliveryAddress}
                editable={false}
            />
        </div>
    </>
};

export default DeliveryAddressesSection;