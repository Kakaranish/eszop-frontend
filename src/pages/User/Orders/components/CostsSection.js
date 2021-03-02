import React from 'react';
import OrderItem from '../OrdersPage/OrderItem';

const CostsSection = ({ order }) => {
    return <>
        <div>
            <h4 className="mb-3">Cart items</h4>
            {
                order.orderItems.map((orderItem, j) =>
                    <OrderItem orderItem={orderItem} key={`oi-${j}`} />
                )
            }
        </div>

        <div className="row">
            <div className="col-12">
                <h4 className="float-right d-block">= {order.totalPrice.toFixed(2)} PLN</h4>
            </div>
        </div>

        <div className="row">
            <div className="col-12 mb-4 d-inline-block">
                <h4>Delivery method</h4>
                {order.deliveryMethod.name} -&nbsp;
                {order.deliveryMethod.price.toFixed(2)} PLN
            </div>

            <div className="col-12 mb-4">
                <div className="pull-right">
                    <h4 className="text-right">Total price:</h4>

                    {order.totalPrice.toFixed(2)} PLN +&nbsp;
                    {order.deliveryMethod.price.toFixed(2)} PLN =&nbsp;
                    {(order.totalPrice + order.deliveryMethod.price).toFixed(2)} PLN
                </div>
            </div>
        </div>
    </>
};

export default CostsSection;