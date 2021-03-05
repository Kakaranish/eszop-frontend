import axios from 'axios';
import { authorizedRequestHandler, getFormDataJsonFromEvent } from 'common/utils';
import DeleteOfferTrash from 'pages/User/Offers/components/DeleteOfferTrash';
import KeyValueTable from 'pages/User/Offers/components/KeyValueTable/KeyValueTable';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Select, { createFilter } from 'react-select';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

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

const EditOfferDraftStageTwoPage = (props) => {

    const offerId = props.match.params.id;
    
    const history = useHistory();
    const [deliveryMethods, setDeliveryMethods] = useState([ { key: "", value: ""} ]);

    let formAction = null;
    
    const [predefinedDeliveryMethods, setPredefinedDeliveryMethods] = useState([]);

    useEffect(() => {
        const fetchDeliveryMethods = async () => {
            const uri = `/offers-api/delivery-methods`;
            const action = async () => await axios.get(uri);
            await authorizedRequestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setPredefinedDeliveryMethods(result.data.map(x => {
                            const labelPricePart = (x.price || x.price === 0)
                                ? ` - ${x.price.toFixed(2)} PLN`
                                : '';

                            return ({
                                label: `${x.name}${labelPricePart}`,
                                value: `${x.name};${(x.price || x.price === 0) ? x.price : "" }`
                            });
                        }));
                    }
                });
        };

        const fetchOffer = async () => {
            const action = async () => await axios.get(`/offers-api/offers/${offerId}/my`);

            await authorizedRequestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        if (result.data.publishedAt) {
                            toast.warn("Offer is already published");
                            history.push(`/offers/${offerId}`);
                        }
                        
                        setDeliveryMethods([...result.data.deliveryMethods.map(kvp => ({
                            key: kvp.name,
                            value: kvp.price.toFixed(2)
                        })), { 
                            key: "",
                            value: ""
                        }]);
                    }
                }
            );
        };

        fetchDeliveryMethods();
        fetchOffer();
    }, []);

        
    const formOnKeyPress = e => {
        if (e.key === 'Enter') e.preventDefault();
    }

    const onSelectedPredefinedDeliveryMethodCb = e => {
        const [name, price] = e.value.split(';')
        const newItem = {
            key: name,
            value: (price || price == 0)  ? parseFloat(price).toFixed(2) : ""
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

    const updateOffer = async event => {
        event.preventDefault();

        let preparedDeliveryMethods = deliveryMethods.filter(x => x.key && x.value);
        if (preparedDeliveryMethods.length === 0) {
            toast.warn("At least 1 delivery method required");
            return;
        }
        
        if(new Set(preparedDeliveryMethods.map(x => x.key)).size !== preparedDeliveryMethods.length) {
            toast.warn("Delivery methods must be unique");
            return;
        }

        preparedDeliveryMethods = preparedDeliveryMethods.map(x => ({
            name: x.key,
            price: x.value
        }));

        let data = getFormDataJsonFromEvent(event);
        data.deliveryMethods = JSON.stringify(preparedDeliveryMethods);

        const uri = `/offers-api/draft/${offerId}/stage/2`;
        const action = async () => await axios.put(uri, data);
        await authorizedRequestHandler(action);

        return true;
    };

    const onSaveOnGoBackCb = async event => {
        event.preventDefault();
       
        if(await updateOffer(event))
            history.push(`/offers/create/draft/${offerId}/stage/1`);
    };

    const onPublishCb = async event => {
        event.preventDefault();
        
        await updateOffer(event);

        const action = async () => await axios.post(`/offers-api/draft/${offerId}/publish`)
        await authorizedRequestHandler(action, {
            status: 200,
            callback: () => {
                history.push(`/offers/${offerId}`);
            }
        });
    };

    const onSubmitCb = async event => {
        event.preventDefault();

        let preparedDeliveryMethods = deliveryMethods.filter(x => x.key && x.value);
        if (preparedDeliveryMethods.length === 0) {
            toast.warn("At least 1 delivery method required");
            return;
        }
        
        switch (formAction) {
            case "SaveAndGoBack":
                onSaveOnGoBackCb(event)
                break;
            case "Publish":
                onPublishCb(event)
                break;
            default:
                break;
        }
    };

    return <div className="bg-white container pt-2 pb-4">
        <div className="mt-2 mb-3">
            <h2 style={{ display: 'inline' }}>
                Create Offer
            </h2>
            <span className="ml-2 align-self-center text-secondary">
                (Stage 2 of 2)
            </span>

            <div className="pull-right">
                <DeleteOfferTrash offerId={offerId} />
            </div>
        </div>

        <form onKeyPress={formOnKeyPress} onSubmit={onSubmitCb}>
            <div className="mt-4 mb-4 pb-0">
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

            <div className="row">
                <div className="col-6">
                    <button type="submit" onClick={() => formAction = "SaveAndGoBack"}
                        className="btn btn-outline-primary btn-block">
                        Save & Go to stage 1
                    </button>
                </div>

                <div className="col-6">
                    <button type="submit" onClick={() => formAction = "Publish"}
                        className="btn btn-success btn-block">
                        Publish offer
                    </button>
                </div>
            </div>
        </form>

        <ReactTooltip />
    </div>
};

export default EditOfferDraftStageTwoPage;