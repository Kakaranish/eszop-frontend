import React, { useState, useEffect } from 'react';
import { requestHandler } from 'common/utils';
import axios from 'axios';
import ImagePreview from 'common/components/ImagePreview';

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
        <h4 className="mb-3">{state.offer.name}</h4>
        {
            state.offer.images.length === 0
                ? <></>
                : <div className="row">
                    {
                        state.offer.images.map((img, i) =>
                            <div className="col-2" key={`prev-${i}`}>
                                <ImagePreview uri={img.uri} key={`prev-${i}`} />
                            </div>
                        )
                    }
                </div>
        }
    </>
};

export default OfferPage;