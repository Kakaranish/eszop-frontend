import React from 'react';
import moment from 'moment';
import ImagePreview from 'common/components/ImagePreview';
import AddToCartSection from './AddToCartSection';
import AwareComponentBuilder from 'common/AwareComponentBuilder';

const HeaderSection = (props) => {

    const { offer } = props;

    if (!offer) return <></>

    const priceStr = offer.price.toFixed(2).toString();
    const price = {
        beforeDot: priceStr.split('.')[0],
        afterDot: priceStr.split('.')[1]
    };

    return <>
        <div className="bg-white row py-3">
            <div className="col-5">

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

            <div className="col-7">
                <div className="col-12 mb-3">
                    <h4 className="mb-3">
                        {offer.name}
                    </h4>

                    <p className="mb-0 py-0">
                        Published at: {moment(offer.publishedAt).format("YYYY-MM-DD HH:mm:ss")}
                    </p>
                    <p className="my-0 py-0">
                        Ends on: {moment(offer.endsAt).format("YYYY-MM-DD HH:mm:ss")}
                    </p>

                    <div className="mt-3 mb-4">
                        <h2 className="d-inline">
                            {price.beforeDot}
                        </h2>
                        <h4 className="d-inline">
                            ,{price.afterDot} PLN
                        </h4>
                    </div>

                    <AddToCartSection offer={offer}/>

                </div>
            </div>
        </div>
    </>
};

export default new AwareComponentBuilder()
    .withCartAwareness()
    .build(HeaderSection);