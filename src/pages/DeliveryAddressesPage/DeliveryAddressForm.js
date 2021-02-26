import React from 'react';
import ValidableInput from 'common/ValidableInput';

const DeliveryAddressForm = ({ deliveryAddress = {}, children, onSubmit = () => { }, editable = true }) => {

    const inputAttributes = editable
        ? {}
        : { disabled: true };

    if (editable) return <>
        <form onSubmit={onSubmit}>
            <input name="deliveryAddressId" defaultValue={deliveryAddress.id ?? ""} hidden />

            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="firstName">First Name</label>

                    <ValidableInput
                        name="firstName"
                        placeholder="First Name..."
                        defaultValue={deliveryAddress.firstName ?? ""}
                        regex="^[a-zA-Z\p{L}\s,.'-]{3,}$"
                        errorMsg="First name must contain only lower/upper characters and those special characters: <b>.</b> <b>,</b> <b>'</b> <b>-</b>"
                        isHtmlErrorMsg={true}
                        inputAttributes={inputAttributes}
                    />
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="lastName">Last Name</label>

                    <ValidableInput
                        name="lastName"
                        placeholder="Last Name..."
                        defaultValue={deliveryAddress.lastName ?? ""}
                        regex="^[\p{L}\\s,.'-]{3,}$"
                        errorMsg="Last name must contain only lower/upper characters and those special characters: <b>.</b> <b>,</b> <b>'</b> <b>-</b>"
                        isHtmlErrorMsg={true}
                        inputAttributes={inputAttributes}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="Phone number">Phone number</label>

                <ValidableInput
                    name="phoneNumber"
                    placeholder="Phone Number..."
                    defaultValue={deliveryAddress.phoneNumber ?? ""}
                    regex="^[0-9\+\-\s]{3,}$"
                    errorMsg="Hover over the question mark to see valid phone number formats"
                    isHtmlErrorMsg={true}
                    tipMsg={"Valid phone number formats:<br/>+48 123 456 789<br/>123 456 789<br/>123456789"}
                    inputAttributes={inputAttributes}
                />
            </div>

            <div className="form-row">
                <div className="form-group col-md-8">
                    <label htmlFor="country">Country</label>

                    <ValidableInput
                        name="country"
                        placeholder="Country..."
                        defaultValue={deliveryAddress.country ?? ""}
                        regex="^[A-Z\p{L}][a-z\p{L}]+(\s[A-Z\p{L}][a-z\p{L}]+)*$"
                        errorMsg="2+ characters required; lowercase/uppercase characters and spaces are allowed"
                        inputAttributes={inputAttributes}
                    />
                </div>

                <div className="form-group col-md-4">
                    <label htmlFor="zipCode">Zip Code</label>

                    <ValidableInput
                        name="zipCode"
                        placeholder="Zip Code..."
                        defaultValue={deliveryAddress.zipCode ?? ""}
                        regex="^\d{1,6}(-\d{1,6})?$"
                        errorMsg="Only digits and dashes are allowed"
                        inputAttributes={inputAttributes}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="city">City</label>

                <ValidableInput
                    name="city"
                    placeholder="City..."
                    defaultValue={deliveryAddress.city ?? ""}
                    regex="^[a-zA-Z\p{L}]+(?:[\s-][a-zA-Z\p{L}]+)*$"
                    errorMsg="3+ characters required; lowercase/uppercase characters and spaces are allowed"
                    inputAttributes={inputAttributes}
                />
            </div>

            <div className="form-group">
                <label htmlFor="Street">Street</label>

                <ValidableInput
                    name="street"
                    placeholder="Street..."
                    defaultValue={deliveryAddress.street ?? ""}
                    regex="^[a-zA-Z\p{L}][a-zA-Z\s-\/0-9\p{L}]+$"
                    errorMsg="3+ characters required; lowercase/uppercase characters, digits, spaces <br/> and <b>/ -</b> are allowed"
                    inputAttributes={inputAttributes}
                    isHtmlErrorMsg={true}
                />
            </div>

            {children}
        </form>
    </>

    return <>
        <input name="deliveryAddressId" defaultValue={deliveryAddress.id ?? ""} hidden />

        <div className="form-row">
            <div className="form-group col-md-6">
                <label htmlFor="firstName">First Name</label>

                <ValidableInput
                    name="firstName"
                    placeholder="First Name..."
                    defaultValue={deliveryAddress.firstName ?? ""}
                />
            </div>

            <div className="form-group col-md-6">
                <label htmlFor="lastName">Last Name</label>

                <ValidableInput
                    name="lastName"
                    placeholder="Last Name..."
                    defaultValue={deliveryAddress.lastName ?? ""}
                />
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="Phone number">Phone number</label>

            <ValidableInput
                name="phoneNumber"
                placeholder="Phone Number..."
                defaultValue={deliveryAddress.phoneNumber ?? ""}
            />
        </div>

        <div className="form-row">
            <div className="form-group col-md-8">
                <label htmlFor="country">Country</label>

                <ValidableInput
                    name="country"
                    placeholder="Country..."
                    defaultValue={deliveryAddress.country ?? ""}
                />
            </div>

            <div className="form-group col-md-4">
                <label htmlFor="zipCode">Zip Code</label>

                <ValidableInput
                    name="zipCode"
                    placeholder="Zip Code..."
                    defaultValue={deliveryAddress.zipCode ?? ""}
                />
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="city">City</label>

            <ValidableInput
                name="city"
                placeholder="City..."
                defaultValue={deliveryAddress.city ?? ""}
            />
        </div>

        <div className="form-group">
            <label htmlFor="Street">Street</label>

            <ValidableInput
                name="street"
                placeholder="Street..."
                defaultValue={deliveryAddress.street ?? ""}
            />
        </div>

        {children}
    </>
};

export default DeliveryAddressForm;