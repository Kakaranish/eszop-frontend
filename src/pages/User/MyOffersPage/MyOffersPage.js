import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { requestHandler } from 'common/utils';
import ListItem from './ListItem';

const MyOffersPage = () => {

    const [state, setState] = useState({
        loading: true,
        offers: []
    });

    useEffect(() => {
        const fetch = async () => {
            const uri = "/offers-api/offers/my";
            const action = async () => await axios.get(uri);
            const result = await requestHandler(action);

            setState({
                loading: false,
                offers: result.items
            });
        };

        fetch();
    }, []);

    if (state.loading) return <></>

    if (state.offers === null || state.offers.length === 0) return <div>
        <h3>My offers</h3>
        <p>You have no offer already</p>
    </div>

    return <>
        <h3>My offers</h3>
        {
            state.offers.map(offer =>
                <ListItem offer={offer} />
            )
        }
    </>
};

export default MyOffersPage;