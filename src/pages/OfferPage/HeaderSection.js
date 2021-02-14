import React, {useState} from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ImagePreview from 'common/components/ImagePreview';
import QuantityInput from 'common/QuantityInput';

const Styles = styled.div`
    .quantity-input {
        width: 100px;
    }

    .quantity-label {
        margin-left: 60px;
    }
  }`

const HeaderSection = ({ offer }) => {
    
    const [quantity, setQuantity] = useState(1);

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

                    <p className="mt-3 mb-4">
                        <h2 className="d-inline">
                            {price.beforeDot}
                        </h2>
                        <h4 className="d-inline">
                            ,{price.afterDot} PLN
                        </h4>
                    </p>

                    <Styles>
                        <QuantityInput
                            classes="quantity-input"
                            value={quantity}
                            setValue={setQuantity}
                            minValue={0}
                            maxValue={offer.availableStock} />
                        <span className="d-inline-flex quantity-label">
                            of {offer.availableStock} available items
                        </span>
                    </Styles>

                    <div className="row mt-4">
                        <div className="col-6">
                            <button type="submit"
                                className="btn btn-success btn-block">
                                Add to cart
                            </button>
                        </div>

                        <div className="col-6">
                            <button type="submit"
                                className="btn btn-success btn-block">
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default HeaderSection;