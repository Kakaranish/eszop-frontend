import axios from 'axios';
import { authorizedRequestHandler, getFormDataJsonFromEvent } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryAddressesModal from './DeliveryAddressesModal';
import DeliveryMethodsSection from './DeliveryMethodsSection';
import OrderDeliveryAddressForm from './OrderDeliveryAddressForm';

const OrderPage = (props) => {

    const orderId = props.match.params.id;

    const history = useHistory();

    const [state, setState] = useState({
        loading: true,
        deliveryMethods: null
    });

    const [deliveryAddress, setDeliveryAddress] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        country: "",
        zipCode: "",
        city: "",
        street: ""
    });

    useEffect(() => {
        const fetch = async () => {
            const uri = `/orders-api/orders/${orderId}/available-delivery-methods`;
            const action = async () => await axios.get(uri);
            await authorizedRequestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setState({
                            loading: false,
                            deliveryMethods: result.data
                        });
                    }
                }
            );
        };
        fetch();
    }, []);


    const onSubmit = async event => {
        event.preventDefault();

        const dataJson = getFormDataJsonFromEvent(event);
        const uri = `/orders-api/orders/${orderId}/delivery-info`;
        const action = async () => await axios.put(uri, dataJson);

        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: () => {
                    history.push('/user/orders'); // TODO: Temp
                }
            }
        );
    };

    if (state.loading) return <></>

    if (!state.deliveryMethods?.length) return <>
        <h3>Error. No delivery methods to choose...</h3>
    </>

    return <>
        <h3>Delivery address</h3>

        <OrderDeliveryAddressForm
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            onSubmit={onSubmit}
        >
            <DeliveryAddressesModal
                setDeliveryAddressState={setDeliveryAddress}
            />

            <DeliveryMethodsSection
                deliveryMethods={state.deliveryMethods}
                defaultSelected={state.deliveryMethods[0].name}
            />

            <button className="btn btn-success btn-block mt-4">
                Finalize order
            </button>
        </OrderDeliveryAddressForm>
    </>
};

export default OrderPage;