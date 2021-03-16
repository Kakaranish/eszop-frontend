import penIcon from 'assets/img/pen.svg';
import starIcon from 'assets/img/star.svg';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import ImagePreview from 'common/components/ImagePreview';
import moment from 'moment';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import AddToCartSection from './AddToCartSection';

const HeaderSection = (props) => {

    const { offer } = props;

    const history = useHistory();

    if (!offer) return <></>

    const priceStr = offer.price.toFixed(2).toString();
    const price = {
        beforeDot: priceStr.split('.')[0],
        afterDot: priceStr.split('.')[1]
    };

    const onEdit = () => {
        history.push(`/offers/${offer.id}/edit`);
    };

    return <>
        <div className="bg-white row py-3">

            {
                !offer.isActive &&
                <div className="col-12 py-3 text-center" style={{ backgroundColor: 'orange' }}>
                    <h5>Offer ended</h5>
                </div>
            }

            <div className="col-5 pt-3">
                <div className="col-12">
                    <ImagePreview uri={offer.images.find(x => x.isMain).uri} />
                </div>

                {
                    <div className="col-12 row">
                        {
                            offer.images.map((img, i) =>
                                <div className="col-2" key={`prev-${i}`}>
                                    <ImagePreview uri={img.uri} key={`prev-${i}`} />
                                </div>
                            )
                        }
                    </div>
                }
            </div>

            <div className="col-7 pt-3">
                <div className="col-12 mb-3">
                    {
                        (props.identity && props.identity.id == offer.ownerId) &&
                        <>
                            <div className="mb-3">
                                {
                                    offer.isActive &&
                                    <div className="pull-right">
                                        <img src={penIcon}
                                            className="cursor-pointer"
                                            style={{ width: '20px' }}
                                            alt="edit-icon"
                                            data-tip="Edit offer"
                                            onClick={onEdit}
                                        />

                                        <ReactTooltip />
                                    </div>
                                }

                                <div className="d-flex">
                                    <img src={starIcon}
                                        className="mr-2"
                                        style={{ width: '20px' }}
                                        alt="star-icon"
                                    />
                                        This is your offer
                                </div>
                            </div>
                        </>
                    }

                    <div className="h4 mb-0">
                        {offer.name}
                    </div>

                    <div className="text-muted mb-3" style={{ fontSize: '0.8rem' }}>
                        Offer Id: {offer.id}
                    </div>

                    <span className="d-block mb-3">
                        Category:&nbsp;
                        <Link to={`/offers?category=${offer.category.id}`}>
                            {offer.category.name}
                        </Link>
                    </span>

                    <span className="d-block">
                        Published at: {moment(offer.publishedAt).format("YYYY-MM-DD HH:mm:ss")}
                    </span>

                    <span className="d-block">
                        Ends on: {moment(offer.endsAt).format("YYYY-MM-DD HH:mm:ss")}
                    </span>

                    <div className="mt-3 mb-4">
                        <h2 className="d-inline">
                            {price.beforeDot}
                        </h2>
                        <h4 className="d-inline">
                            ,{price.afterDot} PLN
                        </h4>
                    </div>

                    {
                        (() => {
                            if (!offer.isActive) return <>
                                <div>
                                    <b>{offer.totalStock - offer.availableStock}</b>
                                    &nbsp;out <b>{offer.totalStock}</b> have been sold
                                </div>
                            </>

                            if (!(props.identity && props.identity.id == offer.ownerId) && offer.isActive) return <>
                                <AddToCartSection offer={offer} />

                                <Link to={`/seller/${offer.ownerId}`} className="mt-4 pull-right">
                                    Go to seller
                                </Link>
                            </>
                            else return <>
                                <div>
                                    Available <b>{offer.availableStock} </b>
                                    out of <b>{offer.totalStock}</b>
                                </div>
                            </>
                        })()
                    }
                </div>
            </div>
        </div>
    </>
};

export default new AwareComponentBuilder()
    .withCartAwareness()
    .withIdentityAwareness()
    .build(HeaderSection);