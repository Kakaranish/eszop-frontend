import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestHandler } from '../../common/utils';

const MyOffersPage = () => {

    const [state, setState] = useState({
        loading: true,
        offers: []
    });

    useEffect(() => {
        const fetch = async () => {
            const uri = "/offers-api/offers/user";
            const action = async () => await axios.get(uri);
            const result = await requestHandler(action);

            setState({
                loading: false,
                offers: result
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
            state.offers.map(offer => <div className="border border-gray my-2 py-2">

                <Link to={`/offers/${offer.id}`}>
                    <h5>{offer.name}</h5>
                </Link>

                <div>Created At: {moment(offer.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
                <div>Price: {offer.price.toFixed(2)} PLN</div>

            </div>)
        }
    </>
};

export default MyOffersPage;