import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestHandler } from 'common/utils';
import noImgPlaceholder from 'assets/img/no-image.svg';

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
                <div className="border border-gray my-2 py-2" key={offer.id}>
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <img
                                src={getPreviewImageUri(offer)}
                                className="card-img thumb-img img-fluid"
                                style={{
                                    objectFit: 'cover',
                                    overflow: 'hidden',
                                    height: '150px',
                                    width: "150px",
                                    overflow: 'hidden'
                                }}
                                alt={`${offer.id}-img-placeholder`}
                            />

                            <div className="card-body">
                                <p className="mb-2">
                                    <Link to={`/offers/${offer.id}`}>
                                        {offer.name}
                                    </Link>
                                    {!offer.publishedAt && <span className="text-muted"> | Draft</span>}
                                </p>

                                <div>Created At: {moment(offer.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
                                <div>Price: {offer.price.toFixed(2)} PLN</div>
                                {
                                    !offer.publishedAt &&
                                    <Link to={`/offers/create/draft/${offer.id}/stage/1`}>
                                        Edit
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    </>
};

function getPreviewImageUri(offer) {
    if (!offer.images?.length) return noImgPlaceholder;

    let mainImg = offer.images.find(x => x.isMain === true);
    if (!mainImg) return noImgPlaceholder;
    return mainImg.uri;
}

export default MyOffersPage;