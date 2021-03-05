import axios from 'axios';
import { authorizedRequestHandler, requestHandler } from 'common/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import CostsSection from '../components/CostsSection';
import DeliveryAddressesSection from '../components/DeliveryAddressesSection';
import styled from 'styled-components';
import { mapOrderState, mapOrderStateToDescription } from 'common/orderUtils';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

const Styles = styled.div`
.transferDetails {
    background-color: #919191;
    color: white;
}`

const OrderPage = (props) => {

    const orderId = props.match.params.id;

    const [state, setState] = useState({
        loading: true,
        order: null,
        bankTransferDetails: null,
        sellerInfo: null
    });

    useEffect(() => {
        const fetch = async () => {
            const orderUri = `/orders-api/orders/${orderId}`;
            const orderAction = async () => await axios.get(orderUri);
            const orderResult = await authorizedRequestHandler(orderAction,
                {
                    status: 200,
                    callback: result => result
                },
                {
                    status: -1,
                    callback: result => result
                }
            );

            if (orderResult.status !== 200) {
                setState({
                    loading: false,
                    order: null
                });
                return;
            }

            const bankTransferUri = `/orders-api/orders/${orderId}/transfer/details`;
            const bankTransferAction = async () => await axios.get(bankTransferUri);
            await authorizedRequestHandler(bankTransferAction,
                {
                    status: 200,
                    callback: bankTransferResult => {
                        setState({
                            loading: false,
                            order: orderResult.data,
                            bankTransferDetails: bankTransferResult.data
                        })
                    }
                }
            );

            const sellerInfoUri = `/identity-api/seller/${orderResult.data.sellerId}`;
            const sellerInfoAction = async () => await axios.get(sellerInfoUri);
            await requestHandler(sellerInfoAction, 
                {
                    status: 200,
                    callback: result => {
                        setState(currState => {
                            let stateClone = Object.assign({}, currState);
                            stateClone.sellerInfo = result.data;
                            return stateClone;
                        });
                    }
                },
                {
                    status: 204,
                    callback: () => {}
                }
            );


        };
        fetch();
    }, []);

    if (state.loading) return <></>

    if (!state.order) return <h2>There is no such order</h2>

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

                <div className="my-2">
                    Order state: {mapOrderState(state.order.orderState)}
                    <FontAwesomeIcon icon={faQuestionCircle}
                        className="ml-2 align-baseline"
                        style={{ color: 'lightgray', marginLeft: '2px' }}
                        size={'1x'}
                        data-tip={mapOrderStateToDescription(state.order.orderState)}
                    />
                </div>

            </div>

            {
                !["CANCELLED", "CANCELLED_BY_BUYER", "CANCELLED_BY_SELLER"].some(x => x === state.order.orderState) &&
                <Styles>

                    {
                        state.order.orderState === 'IN_PROGRESS' &&
                        <div>
                            <h4 style={{color: 'goldenrod'}}>Did you pay?</h4>
                        </div>
                    }
                    <div className="transferDetails pt-1 pb-3 px-4 mb-4">
                        <h4>
                            Bank transfer details
                        </h4>

                        <div>
                            Title: <i>{state.bankTransferDetails.title}</i>
                        </div>

                        <div>
                            Account number:&nbsp;
                            
                            {
                                state.bankTransferDetails.accountNumber

                                ?
                                <i>state.bankTransferDetails.accountNumber</i>

                                :<span className="font-weight-bold text-bold" style={{color: 'orange'}}>
                                    NOT PROVIDED
                                </span>
                            }
                        </div>

                        <div>
                            Transfer amount: <i>{state.bankTransferDetails.transferAmount.toFixed(2)} PLN</i>
                        </div>

                        <span className="font-weight-bold text-bold" style={{color: 'orange'}}>
                            Please contact the seller for an account number 
                        </span>
                    </div>
                </Styles>
            }

            <CostsSection order={order} />

            <DeliveryAddressesSection order={order} />

            <ReactTooltip />
        </div>
    </>
};

export default OrderPage;