import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { requestHandler } from "common/utils";
import ListItem from 'common/components/OfferListItem';

const OffersPage = () => {

    const [state, setState] = useState({ loading: true, offers: [] });

    useEffect(() => {
        const fetch = async () => {
            const uri = '/offers-api/offers';
            const action = async () => await axios.get(uri);

            const offers = await requestHandler(action);
            setState({ loading: false, offers: offers.items });
        }

        fetch();
    }, []);

    if (state.loading) return <h3>Loading...</h3>
    else if (!state.offers?.length) return <h3>No offers found</h3>

    return <>
        <div className="container">
            <h3>Offers</h3>
            {
                state.offers.map((offer, i) =>
                    <ListItem key={`li-${i}`} offer={offer} />
                )
            }
        </div>
    </>
}

export default OffersPage;