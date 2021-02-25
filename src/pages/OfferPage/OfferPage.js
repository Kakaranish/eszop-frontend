import React, { useState, useEffect } from 'react';
import { requestHandler } from 'common/utils';
import axios from 'axios';
import ParametersSection from './ParametersSection';
import HeaderSection from './HeaderSection';
import DescriptionSection from './DescriptionSection';
import DeliverySection from './DeliverySection';

const OfferPage = (props) => {

    const offerId = props.match.params.id;
    const [state, setState] = useState({ loading: true, offer: null });

    useEffect(() => {
        const fetch = async () => {
            const uri = `/offers-api/offers/${offerId}`;
            const action = async () => axios.get(uri);
            await requestHandler(action,
                {
                    status: 200,
                    callback: result => setState({ loading: false, offer: result.data })
                },
                {
                    status: 204,
                    callback: result => setState({ loading: false, offer: result.data })
                }
            );
        };

        fetch();
    }, []);

    if (state.loading) return <></>;
    else if (!state?.offer) return <h3>No such offer</h3>;

    return <>
        <HeaderSection offer={state.offer} />

        <ParametersSection offer={state.offer} />

        <DescriptionSection offer={state.offer} />

        <DeliverySection offer={state.offer} />
    </>
};

export default OfferPage;