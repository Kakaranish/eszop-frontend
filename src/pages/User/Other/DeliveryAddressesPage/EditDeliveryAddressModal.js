import React from 'react';
import HyperModal from 'react-hyper-modal';
import axios from 'axios';
import DeliveryAddressForm from 'common/components/DeliveryAddressForm';
import { authorizedRequestHandler, getFormDataJsonFromEvent } from 'common/utils';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import trash from 'assets/img/delete.svg';
import ReactTooltip from 'react-tooltip';

const EditDeliveryAddressModal = (props) => {

    const { deliveryAddress, isPrimary = false } = props;

    const history = useHistory();

    const renderOpenButton = requestOpen => <>
        <button className="btn btn-outline-success mt-2 px-4" onClick={requestOpen}>
            Edit
        </button>
    </>

    const onSubmit = async event => {
        event.preventDefault();

        let formDataJson = getFormDataJsonFromEvent(event);
        formDataJson.isPrimary = formDataJson.isPrimary === 'on';

        const action = async () => await axios.put("/identity-api/delivery-addresses", formDataJson);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: () => {
                    toast.success("Delivery address updated");
                    history.push("/refresh");
                }
            }
        );
    };

    const onDelete = async () => {
        const data = {
            deliveryAddressId: deliveryAddress.id
        };
        const action = async () => await axios.delete("/identity-api/delivery-addresses", { data: data });
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: () => {
                    toast.success("Delivery address deleted");
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

                <div className="d-flex align-items-baseline">
                    <h3 className="d-flex mb-3">
                        Edit delivery address
                    </h3>

                    <img src={trash}
                        className="d-flex ml-3"
                        style={{ width: '23px', height: '23px', cursor: 'pointer' }}
                        onClick={onDelete}
                        alt="trash-img"
                        data-tip="Delete offer?"
                    />
                </div>

                <DeliveryAddressForm
                    deliveryAddress={deliveryAddress}
                    onSubmit={onSubmit}
                >
                    <div className="form-check mb-2 mr-sm-2 mt-4">
                        <input id="isPrimary" className="form-check-input" type="checkbox"
                            name="isPrimary" defaultChecked={isPrimary} />
                        <label className="form-check-label" htmlFor="isPrimary">
                            Is Primary Delivery Address
                        </label>
                    </div>

                    <button type="submit" className="btn btn-block btn-success mt-4">
                        Update
                    </button>

                </DeliveryAddressForm>
            </div>

            <ReactTooltip />

        </HyperModal>
    </>
};

export default EditDeliveryAddressModal;