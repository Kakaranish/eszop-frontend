import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import { useHistory } from 'react-router-dom';
import AwareComponentBuilder from 'common/AwareComponentBuilder';

const CartItemQuantityInput = (props) => {

    const { cartItemId, cartItems, setCartItems } = props;

    const cartItem = cartItems.find(x => x.id === cartItemId);
    const quantity = cartItem.quantity;

    const minValue = 1;
    const maxValue = cartItem.availableStock;

    const delayMs = 1500;

    const history = useHistory();
    const [timer, setTimer] = useState();

    const updateAction = async newValue => {
        const uri = `/carts-api/cart/item`
        const data = {
            cartItemId: cartItemId,
            quantity: newValue
        };
        const action = async () => await axios.put(uri, data);

        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: () => {
                    let cartItemCopy = Object.assign({}, props.cart[cartItemId]);
                    cartItemCopy.quantity = newValue;
                    props.addOrUpdateCartItem(cartItemCopy);
                }
            },
            {
                status: -1,
                callback: () => {
                    toast.error("Unknown error");
                    history.push('/refresh');
                }
            }
        );
    };

    const triggerUpdate = async newValue => {
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(setTimeout(async () => {
            await updateAction(newValue);
        }, delayMs));
    };

    const plusOnClick = () => {
        let parsedValue = parseInt(quantity);
        if (parsedValue + 1 <= maxValue) {
            triggerUpdate(parsedValue + 1);
            setCartItems(items => {
                const clone = items.slice(0);
                const index = clone.findIndex(x => x.id === cartItemId)
                clone[index].quantity = parsedValue + 1;

                return clone;
            });
        }
        else {
            toast.warn(`Maximum quantity of this offer is ${maxValue}`);
        }
    };

    const minusOnClick = () => {
        let parsedValue = parseInt(quantity);
        if (parsedValue - 1 >= minValue) {
            triggerUpdate(parsedValue - 1);
            setCartItems(items => {
                const clone = items.slice(0);
                const index = clone.findIndex(x => x.id === cartItemId)
                clone[index].quantity = parsedValue - 1;

                return clone;
            });
        }
        else {
            toast.warn(`Minimum quantity is ${minValue}`);
        }
    };

    const onInputChange = event => {
        let newValue = parseInt(event.target.value.trim());
        if (isNaN(newValue)) {
            setCartItems(items => {
                const clone = items.slice(0);
                const index = clone.findIndex(x => x.id === cartItemId)
                clone[index].quantity = 1;

                return clone;
            });
            return;
        }

        if (newValue > maxValue) {
            toast.warn(`Maximum quantity of this offer is ${maxValue}`);
            return;
        }

        if (newValue < minValue) {
            toast.warn(`Minimum quantity is ${minValue}`);
            return;
        }

        triggerUpdate(newValue);
        setCartItems(items => {
            const clone = items.slice(0);
            const index = clone.findIndex(x => x.id === cartItemId)
            clone[index].quantity = newValue;

            return clone;
        });
    };

    return <>
        <div className={`d-inline-flex`}>
            <div className="align-self-center">
                <FontAwesomeIcon icon={faMinusCircle}
                    size={'lg'}
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={minusOnClick}
                />
            </div>

            <input name="quantityInput" type="number" className="form-control"
                style={{ WebkitAppearance: 'none', width: '100px' }}
                onChange={onInputChange} required
                min={1} max={maxValue} step={1} value={quantity}
            />

            <div className="align-self-center">
                <FontAwesomeIcon icon={faPlusCircle}
                    size={'lg'}
                    style={{ color: 'green', cursor: 'pointer' }}
                    onClick={plusOnClick}
                />
            </div>
        </div>
    </>
};

export default new AwareComponentBuilder()
    .withCartAwareness()
    .build(CartItemQuantityInput);