import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ConfirmOrderButton = () => {

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

    };

    const noCallback = () => {};

    return <>
        <button className="btn btn-block btn-success" onClick={onClick}>
            Confirm Order
        </button>
    </>
};

export default ConfirmOrderButton;