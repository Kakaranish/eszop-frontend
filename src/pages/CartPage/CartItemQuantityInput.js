import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import { useHistory } from 'react-router-dom';
import AwareComponentBuilder from 'common/AwareComponentBuilder';

const CartItemQuantityInput = (props) => {

    const { cartItemId, value, setValue, maxValue = Infinity } = props;
    const minValue = 0;
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
        let parsedValue = parseInt(value);
        if (parsedValue + 1 <= maxValue) {
            setValue(val => parseInt(val) + 1);
            triggerUpdate(parsedValue + 1);
        }
        else toast.warn(`Max quantity is ${maxValue}`)
    };

    const minusOnClick = () => {
        let parsedValue = parseInt(value);
        if (parsedValue - 1 >= minValue) {
            setValue(val => parseInt(val) - 1);
            triggerUpdate(parsedValue - 1);
        }
    };

    const onInputChange = event => {
        if (event.target.value.trim() === '') {
            setValue('');
            return;
        }

        let newValue = parseInt(event.target.value.trim());
        if (!newValue && newValue !== 0) return;

        if (newValue > maxValue) {
            toast.warn(`Max quantity is ${maxValue}`)
            return;
        }

        if (newValue < minValue) {
            toast.warn(`Min quantity is ${minValue}`)
            return;
        }

        setValue(newValue);
        triggerUpdate(newValue);
        updateAction();
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
                min={1} max={maxValue} step={1} value={value}
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