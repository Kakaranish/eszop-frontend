import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Select, { createFilter } from 'react-select';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import KeyValueTable from '../StageOne/components/KeyValueTable/KeyValueTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

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
    const [keyValueData, setKeyValueData] = useState([
        {
            key: "",
            value: ""
        }
    ]);

    const [accountNumber, setAccountNumber] = useState("");
    const [defaultAccountNumber, setDefaultAccountNumber] = useState(null);
    const [predefinedDeliveryMethods, setPredefinedDeliveryMethods] = useState([]);

    useEffect(() => {
        const fetchBankAccount = async () => {
            const uri = `/identity-api/seller/bank-account/my`;
            const action = async () => await axios.get(uri);
            await authorizedRequestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setDefaultAccountNumber(result.accountNumber);
                    }
                })
        };

        const fetchDeliveryMethods = async () => {
            const uri = `/offers-api/delivery-methods`;
            const action = async () => await axios.get(uri);
            await authorizedRequestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setPredefinedDeliveryMethods(result.map(x => {
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

        fetchBankAccount();
        fetchDeliveryMethods();
    }, []);

    const onSubmitCb = e => {

        e.preventDefault();

        let preparedKeyValueData = keyValueData.filter(x => x.key && x.value);
        console.log(preparedKeyValueData)
        if (preparedKeyValueData.length === 0) {
            toast.warn("At least 1 delivery method required");
            return;
        }
    }

    // Check if offer to edit exists

    const formOnKeyPress = e => {
        if (e.key === 'Enter') e.preventDefault();
    }

    const fillAccountNumberCb = () => {
        setAccountNumber(defaultAccountNumber)
    };

    const onSelectedPredefinedDeliveryMethodCb = e => {

        const [name, price] = e.value.split(';')
        const newItem = {
            key: name,
            value: (price || price == 0)  ? parseFloat(price).toFixed(2) : ""
        };

        let keyValueCopy = [...keyValueData];

        let lastItem = keyValueData.slice(-1)[0];
        if (!lastItem.key && !lastItem.value) {
            keyValueCopy.splice(keyValueCopy.length - 1, 0, newItem)
        }
        else {
            keyValueCopy.push(newItem, { key: '', value: '' });
        }

        setKeyValueData(keyValueCopy);
    }

    return <>

        <div className="mt-2 mb-3 row">
            <h2 style={{ display: 'inline' }}>
                Create Offer
            </h2>
            <span className="ml-2 align-self-center text-secondary">
                (Stage 2 of 2)
            </span>
        </div>

        <form onSubmit={onSubmitCb} onKeyPress={formOnKeyPress}>
            <div className="mt-4 mb-4 pb-0">
                <KeyValueTable
                    data={keyValueData}
                    setData={setKeyValueData}
                    columnSettings={columnSettings}
                />

                <div className="row px-0">
                    <div className="col-12 col-md-6 col-lg-7 text-secondary">
                        Entries with at least 1 empty value are ignored
                    </div>

                    <Select
                        className="col-12 col-md-6 col-lg-5"
                        styles={{ control: (base, state) => ({ ...base, background: '#fbfffa' }) }}
                        filterOption={createFilter()}
                        placeholder={"Add predefined delivery method"}
                        options={predefinedDeliveryMethods}
                        value={null}
                        onChange={onSelectedPredefinedDeliveryMethodCb}
                    />
                </div>
            </div>

            <div className="form-group mb-5 mt-5">
                <label>
                    Bank Account Number
                    
                    <FontAwesomeIcon icon={faQuestionCircle}
                        className="ml-1 mr-2 align-baseline"
                        style={{ color: 'lightgray'}}
                        size={'1x'}
                        data-tip="Must have such format: 27 1140 2004 0000 3002 0135 5387"
                    />

                    {
                        defaultAccountNumber &&
                        <span className="btn-link" style={{ cursor: 'pointer' }} onClick={fillAccountNumberCb}>
                            (fill with value from your Seller Info)
                        </span>
                    }

                </label>

                <input name="accountNumber" type="text" className="form-control"
                    pattern="\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}|\d{26}"
                    placeholder="E.g.: 27 1140 2004 0000 3002 0135 5387"
                    value={accountNumber}
                    onChange={e => setAccountNumber(e.target.value)}
                    required
                />
            </div>

            <div className="row">
                <div className="col-6">
                    <Link to={`/offers/create/draft/${offerId}/stage/1`}
                        className="btn btn-outline-primary btn-block">
                        Go to stage 1
                    </Link>
                </div>

                <div className="col-6">
                    <button className="btn btn-success btn-block" type="submit">
                        Publish offer
                    </button>
                </div>
            </div>
        </form>

        <ReactTooltip />
    </>
};

export default EditOfferDraftStageTwoPage;