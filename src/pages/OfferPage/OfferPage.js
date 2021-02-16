import React, { useState, useEffect } from 'react';
import { requestHandler } from 'common/utils';
import axios from 'axios';
import ParametersSection from './ParametersSection';
import HeaderSection from './HeaderSection';
import DescriptionSection from './DescriptionSection';
import DeliverySection from './DeliverySection';

const OfferPage = (props) => {

    const [state, setState] = useState({ loading: true, offer: null });

    useEffect(() => {
        const fetch = async () => {
            const offerId = props.match.params.id;
            const uri = `/offers-api/offers/${offerId}`;
            const action = async () => axios.get(uri);
            await requestHandler(action,
                {
                    status: 200,
                    callback: offer => setState({ loading: false, offer: offer })
                },
                {
                    status: 204,
                    callback: offer => setState({ loading: false, offer: offer })
                });
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