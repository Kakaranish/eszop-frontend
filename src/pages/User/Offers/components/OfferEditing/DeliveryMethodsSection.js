import React from 'react';
import KeyValueTable from 'pages/User/Offers/components/KeyValueTable/KeyValueTable';
import Select, { createFilter } from 'react-select';

const columnSettings = {
    key: {
        name: "Delivery method",
        inputSettings: {
            type: "text",
            placeholder: "Delivery method..."
        }
    },
    value: {
        name: "Price (PLN)",
        inputSettings: {
            type: "number",
            min: 0,
            step: 0.01,
            placeholder: "Price..."
        }
    }
};

const DeliveryMethodsSection = ({ deliveryMethods, setDeliveryMethods, predefinedDeliveryMethods }) => {

    const onSelectedPredefinedDeliveryMethodCb = e => {
        const [name, price] = e.value.split(';')
        const newItem = {
            key: name,
            value: (price || price == 0) ? parseFloat(price).toFixed(2) : ""
        };

        let keyValueCopy = [...deliveryMethods];

        let lastItem = deliveryMethods.slice(-1)[0];
        if (!lastItem.key && !lastItem.value) {
            keyValueCopy.splice(keyValueCopy.length - 1, 0, newItem)
        }
        else {
            keyValueCopy.push(newItem, { key: '', value: '' });
        }

        setDeliveryMethods(keyValueCopy);
    }

    return <div className="bg-white px-4 pb-3">
        <h4 className="pt-3">Delivery methods</h4>

        <div className="mt-2 mb-4">
            <KeyValueTable
                data={deliveryMethods}
                setData={setDeliveryMethods}
                columnSettings={columnSettings}
            />

            <div className="row px-0">
                <div className="col-12 col-md-6 col-lg-7 text-secondary">
                    Entries with at least 1 empty value are ignored
            </div>

                {
                    predefinedDeliveryMethods?.length > 0 &&
                    <Select
                        className="col-12 col-md-6 col-lg-5"
                        styles={{ control: (base, state) => ({ ...base, background: '#fbfffa' }) }}
                        filterOption={createFilter()}
                        placeholder={"Add predefined delivery method"}
                        options={predefinedDeliveryMethods}
                        value={null}
                        onChange={onSelectedPredefinedDeliveryMethodCb}
                    />
                }
            </div>
        </div>
    </div>
};

export default DeliveryMethodsSection;