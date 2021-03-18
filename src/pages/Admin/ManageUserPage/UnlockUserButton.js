import React from 'react';
import { useHistory } from 'react-router';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import { authorizedRequestHandler } from 'common/utils';
import axios from 'axios';
import { toast } from 'react-toastify';

const UnlockUserButton = ({ userId }) => {

    const history = useHistory();

    const onBlockUser = async () => {
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
                    onClick: () => { }
                }
            ]
        });
    };

    const yesCallback = async () => {
        const userUri = `/identity-api/admin/users/${userId}/unlock`;
        const userAction = async () => await axios.post(userUri);
        await authorizedRequestHandler(userAction,
            {
                status: 200,
                callback: result => {
                    toast.success("User unlocked");
                    history.push('/refresh');
                    return result;
                }
            },
        );
    };

    return <>
        <button className="btn btn-outline-success" onClick={onBlockUser}>
            Unlock User
        </button>
    </>
};

export default UnlockUserButton;