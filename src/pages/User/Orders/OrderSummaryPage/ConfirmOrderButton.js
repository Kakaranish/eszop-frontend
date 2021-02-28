import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const ConfirmOrderButton = ({orderId}) => {

    const history = useHistory();

    const onClick = async () => {
        confirmAlert({
            title: 'Are you sure?',
            message: 'Do you want to confirm order?',
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
        const uri = `/orders-api/orders/${orderId}/confirm`;
        const action = async () => await axios.post(uri);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: async () => {
                    toast.success("Order confirmed");
                    history.push(`/user/orders/${orderId}`);
                }
            }
        );
    };

    const noCallback = () => {};

    return <>
        <button className="btn btn-block btn-success" onClick={onClick}>
            Confirm Order
        </button>
    </>
};

export default ConfirmOrderButton;