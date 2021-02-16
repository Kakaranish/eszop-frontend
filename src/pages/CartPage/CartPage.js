import axios from 'axios';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import { authorizedRequestHandler } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartItem from './CartItem';

const CartPage = (props) => {

    const history = useHistory();

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

    const onClear = async () => {
        const uri = `/carts-api/cart/clear`
        const action = async () => await axios.post(uri);

        await authorizedRequestHandler(action, {
            status: 200,
            callback: () => {
                props.clearCart();
                history.push('/refresh');
            }
        });
    };

    if (state.loading) return <></>
    else if (!state.cart.cartItems?.length) return <h3>Your cart is empty</h3>

    return <>
        <h3>Your cart</h3>
        {
            state.cart.cartItems.map(cartItem =>
                <CartItem cartItem={cartItem} />
            )
        }

        {
            state.cart.cartItems.length > 0 &&
            <div className="row">
                <div className="col-6">
                    <button className="btn btn-success btn-block">
                        Make Order
                    </button>
                </div>

                <div className="col-6" onClick={onClear}>
                    <button className="btn btn-outline-danger btn-block">
                        Clear Cart
                    </button>
                </div>
            </div>
        }
    </>
};

export default new AwareComponentBuilder()
    .withCartAwareness()
    .build(CartPage);