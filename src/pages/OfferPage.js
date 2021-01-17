import React, { useState, useEffect } from 'react';
import { requestHandler } from '../common/utils';
import axios from 'axios';
import ImagePreview from '../common/ImagePreview';

const OfferPage = (props) => {

    const offerId = props.match.params.id;

    const [state, setState] = useState({ loading: true, offer: null });

    useEffect(() => {
        const fetch = async () => {
            const uri = `/offers-api/offers/${offerId}`;
            const action = async () => axios.get(uri);
            const offer = await requestHandler(action);
            setState({ loading: false, offer: offer });
        };

        fetch();

    }, []);

    if (state.loading) return <></>;
    else if (!state?.offer) return <h3>No such restaurant</h3>;
    return <>
        <p>{state.offer.name}</p>
        {
            state.offer.images.length == 0
                ? <></>
                : state.offer.images.map((img, i) =>
                    <div className="col-6" key={`prev-${i}`}>
                        <ImagePreview image={img} key={`prev-${i}`} />
                    </div>)
        }
    </>
};

export default OfferPage;