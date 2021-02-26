import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import React, { useEffect, useState } from 'react';
import AddDeliveryAddressModal from './AddDeliveryAddressModal';
import DeliveryAddressForm from './DeliveryAddressForm';
import EditDeliveryAddressModal from './EditDeliveryAddressModal';

const DeliveryAddressesPage = () => {

    const [state, setState] = useState({
        loading: true,
        deliveryAddresses: null,
        primaryDeliveryAddressId: null
    });

    useEffect(() => {
        const fetch = async () => {
            const uri = `/identity-api/delivery-addresses`
            const action = async () => await axios.get(uri);
            await authorizedRequestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setState({
                            loading: false,
                            deliveryAddresses: result.data.deliveryAddresses,
                            primaryDeliveryAddressId: result.data.primaryDeliveryAddressId
                        });
                    }
                },
                {
                    status: 204,
                    callback: () => {
                        setState({
                            loading: false,
                            deliveryAddresses: null,
                            primaryDeliveryAddressId: null
                        });
                    }
                }
            );
        };

        fetch();
    }, []);

    if (state.loading) return <></>
    if (!state.deliveryAddresses.length) return <>
        <h3>You have no delivery addresses</h3>

        <AddDeliveryAddressModal />
    </>

    return <>
        <h3 className="mb-2">
            Delivery addresses
        </h3>
        
        <AddDeliveryAddressModal />

        <div className="row">
            {
                state.deliveryAddresses.map((deliveryAddress, index) => <>
                    <div className="col-6 py-3 px-4 ">
                        <h4 className="mb-3">
                            Address {index + 1}
                            {
                                deliveryAddress.id === state.primaryDeliveryAddressId &&
                                <span className="ml-2 badge badge-success">Primary</span>
                            }
                        </h4>

                        <DeliveryAddressForm
                            deliveryAddress={deliveryAddress}
                            index={index + 1}
                            editable={false}
                        />

                        <EditDeliveryAddressModal
                            deliveryAddress={deliveryAddress}
                            isPrimary={deliveryAddress.id === state.primaryDeliveryAddressId}
                        />
                    </div>
                </>)
            }
        </div>
    </>
};

export default DeliveryAddressesPage;