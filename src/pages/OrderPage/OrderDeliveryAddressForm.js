import React from 'react';
import StatefulValidableInput from 'common/StatefulValidableInput';

const OrderDeliveryAddressForm = ({ deliveryAddress, setDeliveryAddress, children, onSubmit = () => { } }) => {

    const updateValue = (inputName, value) => {
        setDeliveryAddress(prevDeliveryAddress => {
            let prevDeliveryAddressCopy = Object.assign({}, prevDeliveryAddress);
            prevDeliveryAddressCopy[inputName] = value;
            return prevDeliveryAddressCopy;
        });
    };

    return <>
        <form onSubmit={onSubmit}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="firstName">First Name</label>

                    <StatefulValidableInput
                        name="firstName"
                        placeholder="First Name..."
                        state={deliveryAddress}
                        stateChangeCb={(inputName, value) => updateValue(inputName, value)}
                        regex="^[a-zA-Z\p{L}\s,.'-]{3,}$"
                        errorMsg="First name must contain only lower/upper characters and those special characters: <b>.</b> <b>,</b> <b>'</b> <b>-</b>"
                        isHtmlErrorMsg={true}
                    />
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="lastName">Last Name</label>

                    <StatefulValidableInput
                        name="lastName"
                        placeholder="Last Name..."
                        state={deliveryAddress}
                        stateChangeCb={(inputName, value) => updateValue(inputName, value)}
                        regex="^[\p{L}\\s,.'-]{3,}$"
                        errorMsg="Last name must contain only lower/upper characters and those special characters: <b>.</b> <b>,</b> <b>'</b> <b>-</b>"
                        isHtmlErrorMsg={true}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="Phone number">Phone number</label>

                <StatefulValidableInput
                    name="phoneNumber"
                    placeholder="Phone Number..."
                    state={deliveryAddress}
                    stateChangeCb={(inputName, value) => updateValue(inputName, value)}
                    regex="^[0-9\+\-\s]{3,}$"
                    errorMsg="Hover over the question mark to see valid phone number formats"
                    isHtmlErrorMsg={true}
                    tipMsg={"Valid phone number formats:<br/>+48 123 456 789<br/>123 456 789<br/>123456789"}
                />
            </div>

            <div className="form-row">
                <div className="form-group col-md-8">
                    <label htmlFor="country">Country</label>

                    <StatefulValidableInput
                        name="country"
                        placeholder="Country..."
                        state={deliveryAddress}
                        stateChangeCb={(inputName, value) => updateValue(inputName, value)}
                        regex="^[A-Z\p{L}][a-z\p{L}]+(\s[A-Z\p{L}][a-z\p{L}]+)*$"
                        errorMsg="2+ characters required; lowercase/uppercase characters and spaces are allowed"
                    />
                </div>

                <div className="form-group col-md-4">
                    <label htmlFor="zipCode">Zip Code</label>

                    <StatefulValidableInput
                        name="zipCode"
                        placeholder="Zip Code..."
                        state={deliveryAddress}
                        stateChangeCb={(inputName, value) => updateValue(inputName, value)}
                        regex="^\d{1,6}(-\d{1,6})?$"
                        errorMsg="Only digits and dashes are allowed"
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="city">City</label>

                <StatefulValidableInput
                    name="city"
                    placeholder="City..."
                    state={deliveryAddress}
                    stateChangeCb={(inputName, value) => updateValue(inputName, value)}
                    regex="^[a-zA-Z\p{L}]+(?:[\s-][a-zA-Z\p{L}]+)*$"
                    errorMsg="3+ characters required; lowercase/uppercase characters and spaces are allowed"
                />
            </div>

            <div className="form-group">
                <label htmlFor="Street">Street</label>

                <StatefulValidableInput
                    name="street"
                    placeholder="Street..."
                    state={deliveryAddress}
                    stateChangeCb={(inputName, value) => updateValue(inputName, value)}
                    regex="^[a-zA-Z\p{L}][a-zA-Z\s-\/0-9\p{L}]+$"
                    errorMsg="3+ characters required; lowercase/uppercase characters, digits, spaces <br/> and <b>/ -</b> are allowed"
                    isHtmlErrorMsg={true}
                />
            </div>

            {children}
        </form>
    </>
};

export default OrderDeliveryAddressForm;