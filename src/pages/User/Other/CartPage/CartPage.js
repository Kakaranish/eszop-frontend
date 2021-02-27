import axios from 'axios';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import { authorizedRequestHandler } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartItem from './CartItem';

const CartPage = (props) => {

    const history = useHistory();

    const [cartItems, setCartItems] = useState([]);
    const [state, setState] = useState({ loading: true });

    useEffect(() => {
        const fetch = async () => {
            const uri = `/carts-api/cart`;
            const action = async () => await axios.get(uri);
            await authorizedRequestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setState({ loading: false })
                        setCartItems(result.data.cartItems);
                    }
                }
            );
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

    const onMakeOrder = async event => {
        const uri = '/carts-api/cart/finalize';
        const action = async () => await axios.post(uri);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: result => {
                    const orderId = result.data.orderId;
                    toast.success('Made Order');
                    props.clearCart();
                    history.push(`/user/orders/${orderId}`);
                }
            }
        );
    };

    if (state.loading) return <></>
    else if (!cartItems?.length) return <h3>Your cart is empty</h3>

    const offersTotalPrices = cartItems.map(cartItem => parseFloat(cartItem.quantity) * parseFloat(cartItem.pricePerItem));
    const totalPrice = offersTotalPrices.reduce((a, b) => a + b, 0);

    return <>
        <h3>Your cart</h3>
        {
            cartItems.map((cartItem, i) =>
                <CartItem key={`ci-${i}`} cartItemId={cartItem.id} cartItems={cartItems} setCartItems={setCartItems} />
            )
        }

        <div className="col-12 mb-4 text-right">
            <h3>Total price: {totalPrice.toFixed(2)} PLN </h3>
        </div>

        {
            cartItems.length > 0 &&
            <div className="row">
                <div className="col-6">
                    <button className="btn btn-success btn-block" onClick={onMakeOrder}>
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