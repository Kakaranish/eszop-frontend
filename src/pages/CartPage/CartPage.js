import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';

const CartPage = () => {

    const [state, setState] = useState({
        loading: true,
        cart: null
    });

    useEffect(() => {
        const fetch = async () => {
            const uri = `/carts-api/cart`;
            const action = async () => await axios.get(uri);
            await authorizedRequestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setState({
                            loading: false,
                            cart: result
                        })
                    }
                });
        };

        fetch();
    }, []);

    if (state.loading) return <></>
    else if (!state.cart.cartItems?.length) return <h3>Your cart is empty</h3>

    return <>
        <h3>Your cart</h3>
        {
            state.cart.cartItems.map(cartItem =>
                <CartItem cartItem={cartItem} />
            )
        }
    </>
};

export default CartPage;