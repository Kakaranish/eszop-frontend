import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { requestHandler } from 'common/utils';
import ListItem from './ListItem';
import { Link } from 'react-router-dom';

const MyOffersPage = () => {

    const [state, setState] = useState({
        loading: true,
        offers: []
    });

    useEffect(() => {
        const fetch = async () => {
            const uri = "/offers-api/offers/my";
            const action = async () => await axios.get(uri);

            await requestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setState({
                            loading: false,
                            offers: result.data.items
                        });
                    }
                }
            );
        };

        fetch();
    }, []);

    if (state.loading) return <></>

    if (!state.offers?.length) return <div>
        <h3>You have no offer already</h3>
        <Link to='/offers/create' className="btn btn-outline-success">
            Create Offer
        </Link>
    </div>

    return <>
        <h3>My offers</h3>
        {
            state.offers.map((offer, i) =>
                <ListItem key={`li=${i}`} offer={offer} />
            )
        }
    </>
};

export default MyOffersPage;