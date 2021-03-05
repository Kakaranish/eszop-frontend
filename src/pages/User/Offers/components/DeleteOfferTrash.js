import trashIcon from 'assets/img/delete.svg';
import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

const DeleteOfferTrash = ({ offerId }) => {

    const history = useHistory();

    const onDelete = async () => {
        confirmAlert({
            title: 'Are you sure?',
            message: 'Do you really want to remove this offer draft?',
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
        const uri = `/offers-api/draft/${offerId}`;
        const action = async () => await axios.delete(uri);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: () => {
                    toast.success('Offer deleted');
                    history.push('/user/offers');
                }
            }
        );
    };

    const noCallback = () => { };

    return <>
        <img src={trashIcon}
            className="align-self-center ml-3"
            style={{ width: '25px', height: '25px', cursor: 'pointer' }}
            onClick={onDelete}
            alt="trash-img"
            data-tip="Delete offer?"
        />

        <ReactTooltip />
    </>
};

export default DeleteOfferTrash;