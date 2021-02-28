import axios from 'axios';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import { authorizedRequestHandler } from 'common/utils';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const MakeOrderButton = (props) => {

    const history = useHistory();

    const onMakeOrder = async () => {
        confirmAlert({
            title: 'Are you sure?',
            message: 'Do you want to start order?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => await yesCallback()
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    };

    const yesCallback = async () => {
        const uri = '/carts-api/cart/finalize';
        const action = async () => await axios.post(uri);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: result => {
                    const orderId = result.data.orderId;
                    toast.success('Order started');
                    props.clearCart();
                    history.push(`/user/orders/${orderId}/fill/delivery-info`);
                }
            }
        );
    };

    return <>
        <button className="btn btn-success btn-block" onClick={onMakeOrder}>
            Make Order
        </button>
    </>
};

export default new AwareComponentBuilder()
    .withCartAwareness()
    .build(MakeOrderButton);