import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import OrderItem from './OrderItem';

const Styles = styled.div`
    .img-thumbnail {
        object-fit: cover;
        overflow: hidden;
        height: 90px;
        width: 90px;
    }
  }`

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

        <Styles>
            {
                state.orders.map((order, i) => <div className="bg-white col-12 mb-4 py-2" key={`order-${i}`}>
                    <div className="mt-2 mb-3">
                        Order Id: <i>{order.id}</i> <br />
                        State: <i>{order.orderState}</i>
                    </div>

                    <div>
                        {
                            order.orderItems.map((orderItem, j) =>
                                <OrderItem orderItem={orderItem} key={`oi-${j}`} />
                            )
                        }
                    </div>

                    {
                        order.orderState !== 'started'
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

                </div>)
            }
        </Styles>
    </>
};

function calculateOrderTotalPrice(order) {
    if (!order) return NaN;
    let sum = 0;
    order.orderItems.forEach(oi => sum += oi.quantity * oi.pricePerItem)
    return sum;
}

export default OrdersPage;