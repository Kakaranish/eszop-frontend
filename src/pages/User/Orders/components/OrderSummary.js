import moment from 'moment';
import React from 'react';
import CostsSection from './CostsSection';
import DeliveryAddressesSection from './DeliveryAddressesSection';

const OrderSummary = ({ order }) => {

    return <>
        <h2>Order Summary</h2>

        <div className="mt-2 mb-3">
            <span>
                Order Id: <i>{order.id}</i> <br />
            </span>

            <span>
                Started at: {moment(order.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </span>
        </div>

        <CostsSection order={order} />

        <DeliveryAddressesSection order={order} />
    </>
};

export default OrderSummary;