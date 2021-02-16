import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';

const QuantityInput = ({ value, setValue, minValue = -Infinity,
    maxValue = Infinity, classes}) => {

    const plusOnClick = () => {
        let parsedValue = parseInt(value);
        if (parsedValue + 1 <= maxValue) setValue(val => parseInt(val) + 1);
        else toast.warn(`Max quantity is ${maxValue}`)
    };

    const minusOnClick = () => {
        let parsedValue = parseInt(value);
        if (parsedValue - 1 >= minValue) setValue(val => parseInt(val) - 1);
        else toast.warn(`Min quantity is ${minValue}`);
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
    };

    return <>
        <div className={`${classes ?? ''} d-inline-flex`}>
            <div className="align-self-center">
                <FontAwesomeIcon
                    icon={faMinusCircle}
                    size={'lg'}
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={minusOnClick}
                />
            </div>

            <input name="quantityInput" type="number" className="form-control"
                style={{ WebkitAppearance: 'none'}}
                onChange={onInputChange} required
                min={1} max={maxValue} step={1} value={value}
            />

            <div className="align-self-center">
                <FontAwesomeIcon
                    icon={faPlusCircle}
                    size={'lg'}
                    style={{ color: 'green', cursor: 'pointer' }}
                    onClick={plusOnClick}
                />
            </div>
        </div>
    </>
};

export default QuantityInput;