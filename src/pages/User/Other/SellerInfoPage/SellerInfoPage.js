import axios from 'axios';
import { authorizedRequestHandler, getFormDataJsonFromEvent } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SellerInfoForm from './SellerInfoForm';

const SellerInfoPage = () => {

    const [state, setState] = useState({
        loading: true,
        sellerInfo: null
    });

    useEffect(() => {
        const fetchSellerInfo = async () => {
            const uri = `/identity-api/seller/me`;
            const action = async () => await axios.get(uri);
            await authorizedRequestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setState({
                            loading: false,
                            sellerInfo: result.data
                        });
                    }
                },
                {
                    status: 204,
                    callback: () => {
                        setState({
                            loading: false,
                            sellerInfo: {}
                        });
                    }
                }
            );
        };

        fetchSellerInfo();
    }, []);

    const onSubmit = async event => {
        event.preventDefault();

        const data = getFormDataJsonFromEvent(event);
        const uri = `/identity-api/seller`;
        const action = async () => await axios.put(uri, data);

        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: () => {
                    toast.success("Updated successfully");
                }
            }
        );
    };

    if (state.loading) return <></>

    return <>
        <SellerInfoForm
            sellerInfo={state.sellerInfo}
            onSubmit={onSubmit}
        />
    </>
};

export default SellerInfoPage;