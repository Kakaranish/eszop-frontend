import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import moment from 'moment';
import DeliveryAddressForm from 'common/components/DeliveryAddressForm';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderItem from '../OrdersPage/OrderItem';

const OrderSummaryPage = (props) => {

    const orderId = props.match.params.id;

    const [state, setState] = useState({ loading: true });
    useEffect(() => {
        const fetch = async () => {
            const uri = `/orders-api/orders/${orderId}`;
            const action = async () => await axios.get(uri);

            await authorizedRequestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setState({
                            loading: false,
                            order: result.data
                        });
                    }
                }
            );
        };
        fetch();
    }, []);

    const cancelOrder = async () => {
        // TODO:
    };

    const confirmOrder = async () => {
        // TODO:
    };

    if (state.loading) return <></>

    const order = state.order;

    return <>
        <div className="bg-white col-12 mb-4 py-2">

            <h2>Order Summary</h2>

            <div className="mt-2 mb-3">
                <span>
                    Order Id: <i>{order.id}</i> <br />
                </span>

                <span>
                    Started at: {moment(order.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </span>
            </div>

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
                        {order.totalPrice.toFixed(2)} PLN + {order.deliveryMethod.price.toFixed(2)} PLN = {getTotalPrice(order).toFixed(2)} PLN
                    </div>
                </div>
            </div>

            <div>
                <h4>Delivery address</h4>
                <DeliveryAddressForm
                    deliveryAddress={order.deliveryAddress}
                    editable={false}
                />
            </div>

            <div className="row mt-4">
                <div className="col-md-4">
                    <button className="btn btn-block btn-outline-danger" onClick={cancelOrder}>
                        Cancel Order
                    </button>
                </div>

                <div className="col-md-4">
                    <Link
                        to={`/user/orders/${orderId}/fill/delivery-info`}
                        className="btn btn-block btn-outline-success"
                    >
                        Change Delivery Info
                    </Link>
                </div>

                <div className="col-md-4">
                    <button className="btn btn-block btn-success" onClick={confirmOrder}>
                        Confirm Order
                    </button>
                </div>
            </div>
        </div>
    </>
};

function getTotalPrice(order) {
    return order.totalPrice + order.deliveryMethod.price;
}

export default OrderSummaryPage;