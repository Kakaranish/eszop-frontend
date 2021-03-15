import React from 'react';
import noImgPlaceholder from 'assets/img/no-image.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Styles = styled.div`
.img-thumbnail {
    object-fit: cover;
    overflow: hidden;
    height: 90px;
    width: 90px;
}`

const OrderItem = ({ orderItem }) => <>
    <div className="card mt-2 mb-4">
        <div className="row no-gutters">
            <Styles>
                <img
                    src={getPreviewImageUri(orderItem)}
                    className="img-fluid img-thumbnail"
                    alt={'order-item-img'}
                />
            </Styles>

            <div className="card-body row">
                <div className="col-6 align-self-center">
                    <Link to={`/offers/${orderItem.offerId}`}>
                        {orderItem.offerName}
                    </Link>
                </div>

                <div className="col-6 row">
                    <div className="d-inline-block align-self-center">
                        <span className="text-muted">
                            Quantity
                        </span>
                        <div className="text-center">
                            {orderItem.quantity}
                        </div>
                    </div>

                    <div className="d-inline-block ml-4 align-self-center">
                        <span className="text-muted">
                            Price
                        </span>

                        <div>
                            {
                                orderItem.quantity <= 1
                                    ?
                                    <>
                                        {(orderItem.quantity * orderItem.pricePerItem).toFixed(2)} PLN
                                    </>

                                    :
                                    <>
                                        {(orderItem.quantity * orderItem.pricePerItem).toFixed(2)} PLN&nbsp;

                                        <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                                            ({orderItem.pricePerItem.toFixed(2)} PLN / item)
                                        </span>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>

function getPreviewImageUri(orderItem) {
    if (!orderItem.imageUri) return noImgPlaceholder;
    return orderItem.imageUri;
}

export default OrderItem;