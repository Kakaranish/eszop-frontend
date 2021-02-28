import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const CancelOrderButton = ({ orderId }) => {

    const history = useHistory();

    const onClick = async () => {
        confirmAlert({
            title: 'Are you sure?',
            message: 'Do you want to CANCEL order?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => await yesCallback()
                },
                {
                    label: 'No',
                    onClick: () => noCallback()
                }
            ]
        });
    };

    const yesCallback = async () => {
        const uri = `/orders-api/orders/${orderId}/cancel`;
        const action = async () => await axios.post(uri);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: async () => {
                    toast.success("Order cancelled");
                    history.push('/user/orders/');
                }
            }
        );
    };

    const noCallback = () => { };

    return <>
        <button className="btn btn-block btn-outline-danger" onClick={onClick}>
            Cancel Order
        </button>
    </>
};

export default CancelOrderButton;