import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CancelOrderButton from '../components/CancelOrderButton';
import OrderSummary from '../components/OrderSummary';
import ConfirmOrderButton from './ConfirmOrderButton';

const ShoppingOrderSummaryPage = (props) => {

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


    if (state.loading) return <></>

    const order = state.order;

    return <>
        <div className="bg-white col-12 mb-4 py-2">

            <OrderSummary order={order} />

            <div className="row mt-5 mb-2">
                <div className="col-md-4">
                    <CancelOrderButton orderId={orderId} />
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
                    <ConfirmOrderButton orderId={orderId} />
                </div>
            </div>
        </div>
    </>
};

export default ShoppingOrderSummaryPage;