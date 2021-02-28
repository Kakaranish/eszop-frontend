import React, { useState } from 'react';

const DeliveryMethodsSection = (props) => {

    const { deliveryMethods, defaultSelected } = props;

    const defaultMethod = defaultSelected
        ? defaultSelected
        : deliveryMethods[0].name;
    const [selectedMethod, setSelectedMethod] = useState(defaultMethod);

    const onSelectionChange = event => setSelectedMethod(event.target.value);

    return <div className="mt-4">
        <h4 className="mb-3">Choose delivery method</h4>

        <div className="form-check">
            {
                deliveryMethods.map((deliveryMethod, index) => {
                    return <div key={index} className="form-check pl-0">
                        <input
                            id={`method-input-${index}`}
                            type="radio"
                            name="deliveryMethodName"
                            className="form-check-input"
                            value={deliveryMethod.name}
                            checked={selectedMethod === deliveryMethod.name}
                            onChange={onSelectionChange}
                        />

                        <label className="form-check-label" htmlFor={`method-input-${index}`}>
                            {deliveryMethod.name} -&nbsp;
                            {deliveryMethod.price.toFixed(2)} PLN
                        </label>
                    </div>
                })
            }
        </div>
    </div>
};

export default DeliveryMethodsSection;