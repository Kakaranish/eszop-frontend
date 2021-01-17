import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { requestHandler } from "../common/utils";
import { Link } from "react-router-dom";

const OffersPage = () => {

    const [state, setState] = useState({ loading: true, offers: [] });

    useEffect(() => {
        const fetch = async () => {
            const uri = '/offers-api/offers';
            const action = async () => await axios.get(uri);

            const offers = await requestHandler(action);
            setState({ loading: false, offers: offers });
        }

        fetch();
    }, []);

    if (state.loading) return <h3>Loading...</h3>
    else if(state.offers.length == 0) return <h3>No offers found</h3>
    else return <>
        <div className="container">
            <h3>Offers</h3>
            {
                state.offers.map(offer => (
                    <div key={offer.id}>
                        <Link to={"/offers/" + offer.id}>
                            {offer.name}
                        </Link>

                        | {offer.price}
                    </div>
                ))
            }
        </div>

    </>
}

export default OffersPage;