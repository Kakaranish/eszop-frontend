import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import noImgPlaceholder from 'assets/img/no-image.svg';

const ListItem = (props) => {

    const { offer } = props;

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
                        <Link to={`/offers/${offer.id}`}>
                            {offer.name}
                        </Link>
                        {!offer.publishedAt && <span className="text-muted"> | Draft</span>}
                    </p>

                    {
                        !!offer.publishedAt &&
                        <div>
                            Published At: {moment(offer.publishedAt).format("YYYY-MM-DD HH:mm:ss")}
                        </div>
                    }
                    <div>Price: {offer.price.toFixed(2)} PLN</div>
                    {
                        !offer.publishedAt &&
                        <Link to={`/offers/create/draft/${offer.id}/stage/1`} className="btn btn-outline-success px-4 py-0 mt-3">
                            Edit
                        </Link>
                    }
                </div>
            </div>
        </div>
    </>
};

function getPreviewImageUri(offer) {
    if (!offer.mainImage) return noImgPlaceholder;
    return offer.mainImage.uri;
}

export default ListItem;