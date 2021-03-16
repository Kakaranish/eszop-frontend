import axios from 'axios';
import { mapOrderState } from 'common/orderUtils';
import { authorizedRequestHandler, getFormDataJsonFromEvent, requestHandler } from 'common/utils';
import moment from 'moment';
import RequiredSelect from 'pages/User/Offers/components/RequiredSelect';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import CostsSection from '../../components/CostsSection';
import DeliveryAddressesSection from '../../components/DeliveryAddressesSection';
import ActionsDropdown from './ActionsDropdown';

const Styles = styled.div`
.transferDetails {
    background-color: #919191;
    color: white;
}`

const SaleOrderPage = (props) => {

    const orderId = props.match.params.id;

    const [state, setState] = useState({
        loading: true,
        order: null,
        bankTransferDetails: null,
        sellerInfo: null
    });

    const history = useHistory();

    const orderStates = [
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'In preparation', value: 'IN_PREPARATION' },
        { label: 'Shipped', value: 'SHIPPED' }
    ];

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
                        });
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
                    callback: () => { }
                }
            );
        };
        fetch();
    }, []);

    const onChangeSubmit = async event => {
        event.preventDefault();

        let data = getFormDataJsonFromEvent(event);
        const uri = `/orders-api/orders/${orderId}/state`;
        const action = async () => await axios.put(uri, data);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: async () => {
                    toast.success("Order changed status");
                    history.push('/refresh');
                }
            }
        );
    };

    if (state.loading) return <></>

    if (!state.order) return <h2>There is no such order</h2>

    const order = state.order;

    return <>
        <div className="bg-white col-12 mb-4 py-2">
            <div>
                {
                    isCancellable(order) &&
                    <div className="pull-right">
                        <ActionsDropdown orderId={orderId} />
                    </div>
                }

                <h2>Order Summary</h2>
            </div>

            <div className="mt-2 mb-3">
                <div>
                    Order Id: <i>{order.id}</i> <br />
                </div>

                <div>
                    Started at: {moment(order.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </div>

                <div className="mb-3">
                    Buyer Id: <i>{order.buyerId}</i>
                </div>

                {
                    !["STARTED", "CANCELLED", "CANCELLED_BY_BUYER", "CANCELLED_BY_SELLER"].some(x => x === state.order.orderState)
                        ?
                        <div className="d-flex align-items-center mb-3">
                            <div className="mr-3">Order state: </div>

                            <form className="form-inline" onSubmit={onChangeSubmit}>
                                <div className="d-inline-block" style={{ width: '200px' }}>
                                    <RequiredSelect
                                        name="orderState"
                                        styles={{ menu: provided => ({ ...provided, zIndex: 9999 }), borderColor: "#ccc", }}
                                        options={orderStates}
                                        initValue={orderStates.find(x => x.value === order.orderState)}
                                    />
                                </div>

                                <button className="btn btn-success">
                                    Change
                            </button>
                            </form>
                        </div>

                        :
                        <div className="my-2">
                            Order state: {mapOrderState(state.order.orderState)}
                        </div>
                }

            </div>

            {
                !["CANCELLED", "CANCELLED_BY_BUYER", "CANCELLED_BY_SELLER"].some(x => x === state.order.orderState) &&
                <Styles>
                    <div className="transferDetails pt-1 pb-3 px-4 mb-4">
                        <h4>
                            Bank transfer details
                        </h4>

                        <div>
                            Title: <i>{state.bankTransferDetails.title}</i>
                        </div>

                        <div>
                            Account number:&nbsp;
                            {state.bankTransferDetails.accountNumber}
                        </div>

                        {
                            order.orderState !== 'STARTED'
                                ?
                                <div>
                                    Transfer amount: <i>{state.bankTransferDetails.transferAmount.toFixed(2)} PLN</i>
                                </div>

                                :
                                <div>
                                    Transfer amount: <i>{state.order.totalPrice.toFixed(2)} PLN</i>
                                </div>
                        }

                    </div>
                </Styles>
            }

            <CostsSection order={order} />

            {
                order.deliveryMethod
                    ? <DeliveryAddressesSection order={order} />
                    : <h3>Delivery address not provided</h3>
            }
        </div>
    </>
};

function isCancellable(order) {
    const cancelledStates = ["CANCELLED", "CANCELLED_BY_BUYER", "CANCELLED_BY_SELLER"];
    return !cancelledStates.some(x => order.orderState === x);
}

export default SaleOrderPage;