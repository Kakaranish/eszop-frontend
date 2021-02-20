import axios from 'axios';
import noImgPlaceholder from 'assets/img/no-image.svg';
import { authorizedRequestHandler } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Styles = styled.div`
    .img-thumbnail {
        object-fit: cover;
        overflow: hidden;
        height: 90px;
        width: 90px;
    }
  }`

const MyOrdersPage = () => {

    const [state, setState] = useState({ loading: true, orders: [] });

    useEffect(() => {
        const fetch = async () => {
            const uri = '/orders-api/orders';
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
                state.orders.map(order => <div className="bg-white col-12 mb-4 py-2">
                    <div className="mt-2 mb-3">
                        Order Id: <i>{order.id}</i>
                    </div>

                    <div>
                        {
                            order.orderItems.map(orderItem => <>
                                <div className="card mt-2 mb-4">
                                    <div className="row no-gutters">
                                        <img
                                            src={getPreviewImageUri(orderItem)}
                                            className="img-fluid img-thumbnail"
                                            alt={`${orderItem.id}-img-placeholder`}
                                        />

                                        <div className="card-body row">
                                            <div className="col-6 align-self-center">
                                                <Link to={`/offers/${orderItem.offerId}`}>
                                                    {orderItem.offerName}
                                                </Link>
                                            </div>

                                            <div className="col-6 row">
                                                <div className="d-inline-block align-self-center">
                                                    <span className="text-muted">
                                                        Quantity
                                                    </span>
                                                    <div className="text-center">
                                                        {orderItem.quantity}
                                                    </div>
                                                </div>

                                                <div className="d-inline-block ml-4 align-self-center">
                                                    <span className="text-muted">
                                                        Price
                                                    </span>

                                                    <div>
                                                        {
                                                            order.quantity <= 1
                                                                ?
                                                                <>
                                                                    {(orderItem.quantity * orderItem.pricePerItem).toFixed(2)} PLN
                                                                </>

                                                                :
                                                                <>
                                                                    {(orderItem.quantity * orderItem.pricePerItem).toFixed(2)} PLN&nbsp;

                                                                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                                                                        ({orderItem.pricePerItem.toFixed(2)} PLN / item)
                                                                    </span>
                                                                </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>)
                        }
                    </div>

                    <div className="col-12 mb-3 text-right">
                        <h3>Total price: {calculateOrderTotalPrice(order).toFixed(2)} PLN </h3>
                        <Link to={`/user/orders/${order.id}`}>
                            Go to details
                        </Link>
                    </div>
                </div>)
            }
        </Styles>
    </>
};

function getPreviewImageUri(orderItem) {
    if (!orderItem.imageUri) return noImgPlaceholder;
    return orderItem.imageUri;
}

function calculateOrderTotalPrice(order) {
    if (!order) return NaN;
    let sum = 0;
    order.orderItems.forEach(oi => sum += oi.quantity * oi.pricePerItem)
    return sum;
}

export default MyOrdersPage;