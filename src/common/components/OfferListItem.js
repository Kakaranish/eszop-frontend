import noImgPlaceholder from 'assets/img/no-image.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import EndSection from './EndSections';

const OfferListItem = (props) => {

    const { offer } = props;

    const offerUri = !offer.publishedAt
        ? `/offers/create/draft/${offer.id}`
        : `/offers/${offer.id}`;

    return <>
        <div className="card mb-3" key={offer.id}>
            <div className="row no-gutters">
                <img
                    src={getPreviewImageUri(offer)}
                    className="card-img thumb-img img-fluid"
                    style={{
                        objectFit: 'cover',
                        overflow: 'hidden',
                        height: '150px',
                        width: "150px"
                    }}
                    alt={`${offer.id}-img-placeholder`}
                />

                <div className="card-body">
                    <p className="mb-2">
                        <Link to={offerUri}>
                            {offer.name}
                        </Link>
                        {
                            !offer.publishedAt && <span className="text-muted"> | Draft</span>
                        }

                        {
                            offer.publishedAt && !offer.isActive &&
                            <span style={{ color: 'green', fontWeight: 'bold' }}> | Ended</span>
                        }
                    </p>

                    {
                        offer.publishedAt &&
                        <EndSection offer={offer} />
                    }

                    <div className="mt-2">
                        Price: {offer.price.toFixed(2)} PLN
                    </div>

                </div>
            </div>
        </div>
    </>
};

function getPreviewImageUri(offer) {
    if (!offer.mainImage) return noImgPlaceholder;
    return offer.mainImage.uri;
}

export default OfferListItem;