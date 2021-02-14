import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const QuantityInput = ({ value, setValue, minValue = -Infinity, 
    maxValue = Infinity, onUnderMinAttempt = () => { }, classes }) => {

    const plusOnClick = () => {
        if (value + 1 <= maxValue) setValue(val => val + 1);
    };

    const minusOnClick = () => {
        if (value - 1 >= minValue) setValue(val => val - 1);
        else onUnderMinAttempt()
    };

    return <>
        <div className={`mb-2 ${classes ?? ''} d-inline-flex`}>
            <div className="align-self-center">
                <FontAwesomeIcon icon={faMinusCircle}
                    size={'lg'}
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => minusOnClick()} />
            </div>

            <input name="quantityInput" type="number" className="form-control"
                style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                onChange={e => setValue(e.target.value)} required
                min={1} max={maxValue} step={1} defaultValue={value} value={value}
            />

            <div className="align-self-center">
                <FontAwesomeIcon icon={faPlusCircle}
                    size={'lg'}
                    style={{ color: 'green', cursor: 'pointer' }}
                    onClick={() => plusOnClick()} />
            </div>
        </div>
    </>
};

export default QuantityInput;