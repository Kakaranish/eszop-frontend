import React from 'react';
import cartIcon from 'assets/img/cart.svg';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import { useHistory } from 'react-router-dom';

const CartIndicator = (props) => {

    const history = useHistory();

    const cartItemsNum = Object.keys(props.cart ?? {}).length;

    return <>
        <div className="d-inline">
            <img src={cartIcon}
                style={{ width: '30px', cursor: 'pointer' }}
                onClick={() => history.push('/cart')}
                alt="cart-img"
            />

            {
                cartItemsNum > 0 &&
                <span className="badge badge-danger align-top" style={{ height: "18px" }}>
                    {cartItemsNum}
                </span>
            }
        </div>
    </>
};

export default new AwareComponentBuilder()
    .withCartAwareness()
    .build(CartIndicator);