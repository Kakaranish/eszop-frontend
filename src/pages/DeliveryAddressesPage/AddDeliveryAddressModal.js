import React from 'react';
import HyperModal from 'react-hyper-modal';
import axios from 'axios';
import DeliveryAddressForm from './DeliveryAddressForm';
import { authorizedRequestHandler, getFormDataJsonFromEvent } from 'common/utils';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const AddDeliveryAddressModal = (props) => {

    const history = useHistory();

    const renderOpenButton = requestOpen => <>
        <button className="btn btn-success mb-3 px-4" onClick={requestOpen}>
            Add New
        </button>
    </>

    const onSubmit = async event => {
        event.preventDefault();

        let formDataJson = getFormDataJsonFromEvent(event);
        formDataJson.isPrimary = formDataJson.isPrimary === 'on';

        const action = async () => await axios.post("/identity-api/delivery-addresses", formDataJson);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: () => {
                    toast.success("Added new delivery address");
                    history.push("/refresh");
                }
            }
        );
    };

    return <>
        <HyperModal
            renderOpenButton={requestOpen => renderOpenButton(requestOpen)}
            classes={{ contentClassName: "z-999 h-100 d-flex", wrapperClassName: "z-999" }}
        >
            <div className="col-12 offset-lg-3 col-lg-6 mt-4 mb-4 align-self-center">

                <h3 className="mb-3">
                    Edit delivery address
                </h3>

                <DeliveryAddressForm onSubmit={onSubmit} >
                    <div className="form-check mb-2 mr-sm-2 mt-4">
                        <input id="isPrimary" className="form-check-input" type="checkbox"
                            name="isPrimary" defaultChecked={true} />
                        <label className="form-check-label" htmlFor="isPrimary">
                            Is Primary Delivery Address
                        </label>
                    </div>

                    <button type="submit" className="btn btn-block btn-success mt-4">
                        Add
                    </button>

                </DeliveryAddressForm>
            </div>

        </HyperModal>
    </>
};

export default AddDeliveryAddressModal;