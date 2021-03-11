import axios from 'axios';
import { mapOrderState } from 'common/orderUtils';
import { authorizedRequestHandler } from 'common/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderItem from './OrderItem';

const OrdersPage = () => {

    const [state, setState] = useState({ loading: true, orders: [] });

    useEffect(() => {
        const fetch = async () => {
            const uri = '/orders-api/orders/user';
            const action = async () => await axios.get(uri);

            await authorizedRequestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setState({ loading: false, orders: result.data.items });
                    }
                }
            );
        };
        fetch();
    }, []);

    if (state.loading) return <></>
    else if (state.orders.length === 0) return <h3>You have no orders yet</h3>

    return <>
        <h3 className="mb-3">
            My Orders
        </h3>

        {
            state.orders.map((order, i) => <div className="bg-white col-12 mb-4 py-2" key={`order-${i}`}>
                <div className="text-muted" style={{fontSize: '0.9rem'}}>
                    {moment(order.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </div>

                <div className="mt-2 mb-3">
                    Order Id: <i>{order.id}</i> <br />
                    State: {mapOrderState(order.orderState)}
                </div>

                <div>
                    {
                        order.orderItems.map((orderItem, j) =>
                            <OrderItem orderItem={orderItem} key={`oi-${j}`} />
                        )
                    }
                </div>

                {
                    order.orderState !== 'STARTED'
                        ?
                        <div className="col-12 mb-3 text-right">
                            <h3>Total price: {calculateOrderTotalPrice(order).toFixed(2)} PLN </h3>
                            <Link to={`/user/orders/${order.id}`}>
                                Go to details
                            </Link>
                        </div>

                        :
                        <div className="col-12 mb-3 text-right">
                            <h3>Total price: {calculateOrderTotalPrice(order).toFixed(2)} PLN </h3>
                            <Link to={`/user/orders/${order.id}/fill/delivery-info`}>
                                Continue order
                            </Link>
                        </div>
                }
            </div>
            )
        }
    </>
};

function calculateOrderTotalPrice(order) {
    if (!order) return NaN;
    let sum = 0;
    order.orderItems.forEach(oi => sum += oi.quantity * oi.pricePerItem)
    return sum;
}

export default OrdersPage;