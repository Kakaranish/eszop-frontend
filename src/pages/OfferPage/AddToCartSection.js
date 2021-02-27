import axios from 'axios';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import QuantityInput from 'common/components/QuantityInput';
import { authorizedRequestHandler } from 'common/utils';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Styles = styled.div`
    .quantity-input {
        width: 100px;
    }

    .quantity-label {
        margin-left: 60px;
    }
  }`

const AddToCartSection = (props) => {

    const { offer } = props;

    const history = useHistory();
    const [quantity, setQuantity] = useState(1);

    const onAddToCart = async event => {
        event.preventDefault();

        if (quantity > offer.availableStock) {
            toast.warning(`Max quantity for this offer is ${offer.availableStock}`)
            return;
        }

        const data = {
            offerId: offer.id,
            quantity: quantity
        };
        const uri = `/carts-api/cart/item`;
        const action = async () => await axios.post(uri, data);
        await authorizedRequestHandler(action, {
            status: 200,
            callback: result => {
                toast.success("Offer has been added to cart");
                props.addOrUpdateCartItem(result.data)
                history.push('/refresh');
            }
        });
    };

    if (!props.identity) return <>
        <div className="mb-3">
            Available stock: <b>{offer.availableStock}</b> of <b>{offer.totalStock}</b>
        </div>

        <button className="btn btn-secondary btn-block" disabled style={{ cursor: 'not-allowed' }}>
            Sign in to add to cart
        </button>
    </>

    if (props.cart && Object.values(props.cart).some(x => x.sellerId !== offer.ownerId)) return <>
        <div className="mb-3">
            Available stock: <b>{offer.availableStock}</b> of <b>{offer.totalStock}</b>
        </div>

        <button className="btn btn-secondary btn-block" disabled style={{ cursor: 'not-allowed' }}>
            You have in cart item from other seller! <br/>
            Remove it to add this offer to cart.
        </button>
    </>

    if (!Object.values(props.cart).some(x => x.offerId === offer.id)) return <>
        <Styles>
            <QuantityInput
                classes="quantity-input"
                value={quantity}
                setValue={setQuantity}
                minValue={1}
                maxValue={offer.availableStock}
            />

            <span className="d-inline-flex quantity-label">
                of {offer.availableStock} available items
            </span>
        </Styles>

        <div className="mt-4">
            <button type="submit" className="btn btn-success btn-block" onClick={onAddToCart}>
                Add to cart
            </button>
        </div>
    </>

    return <>
        <div className="mb-3">
            Available stock: <b>{offer.availableStock}</b> of <b>{offer.totalStock}</b>
        </div>

        <button className="btn btn-secondary btn-block" disabled style={{ cursor: 'not-allowed' }}>
            Add to cart (Already in cart)
        </button>
    </>
};

export default new AwareComponentBuilder()
    .withIdentityAwareness()
    .withCartAwareness()
    .build(AddToCartSection);