import React, { useState } from 'react';
import noImgPlaceholder from 'assets/img/no-image.svg';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import trash from 'assets/img/delete.svg';
import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import { toast } from 'react-toastify';
import CartItemQuantityInput from './CartItemQuantityInput';
import AwareComponentBuilder from 'common/AwareComponentBuilder';

const Styles = styled.div`
    .img-thumbnail {
        object-fit: cover;
        overflow: hidden;
        height: 90px;
        width: 90px;
    }
  }`

const CartItem = (props) => {

    const { cartItem } = props;

    const history = useHistory();
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const onDelete = async () => {
        const uri = `/carts-api/cart/item/${cartItem.id}`;
        const action = async () => await axios.delete(uri);
        await authorizedRequestHandler(action, {
            status: 200,
            callback: () => {
                toast.success("Deleted from cart");
                props.removeCartItem(cartItem.id);
                history.push('/refresh');
            }
        });
    };

    return <>
        <Styles>
            <div className="card mt-2 mb-5">
                <div className="row no-gutters">
                    <img
                        src={getPreviewImageUri(cartItem)}
                        className="img-fluid img-thumbnail"
                        alt={`${cartItem.id}-img-placeholder`}
                    />

                    <div className="card-body row">
                        <div className="col-6 align-self-center">
                            <Link to={`/offers/${cartItem.offerId}`}>
                                {cartItem.offerName}
                            </Link>
                        </div>

                        <div className="col-6 row">
                            <div className="d-inline-block align-self-center">
                                <CartItemQuantityInput
                                    cartItemId={cartItem.id}
                                    value={quantity}
                                    setValue={setQuantity}
                                    maxValue={cartItem.availableStock}
                                />
                            </div>

                            <div className="d-inline-block ml-4 align-self-center">
                                {
                                    quantity <= 1
                                        ?
                                        <>{(quantity * cartItem.pricePerItem).toFixed(2)} PLN</>

                                        :
                                        <>
                                            <div className="mb-n2">
                                                {(quantity * cartItem.pricePerItem).toFixed(2)} PLN
                                                </div>

                                            <div className="text-muted">
                                                Per item: {cartItem.pricePerItem.toFixed(2)} PLN
                                                </div>
                                        </>
                                }

                            </div>
                            <img src={trash}
                                className="align-self-center ml-3"
                                style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                                onClick={onDelete}
                                alt="trash-img"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Styles>
    </>
};

function getPreviewImageUri(cartItem) {
    if (!cartItem.imageUri) return noImgPlaceholder;
    return cartItem.imageUri;
}

export default new AwareComponentBuilder()
    .withCartAwareness()
    .build(CartItem);