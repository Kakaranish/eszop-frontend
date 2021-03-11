import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import React, { useEffect, useState } from 'react';
import AddDeliveryMethodButton from './AddDeliveryMethodButton';
import EditableDeliveryMethod from './EditableDeliveryMethod';

const ManageDeliveryMethodsPage = () => {

    const [state, setState] = useState({ loading: true });
    useEffect(() => {
        const fetch = async () => {
            const uri = '/offers-api/delivery-methods';
            const action = async () => await axios.get(uri);
            const deliveryMethods = await authorizedRequestHandler(action);

            setState({
                loading: false,
                deliveryMethods: deliveryMethods
            });
        };
        fetch();
    }, []);

    if (state.loading) return <></>

    return <>
        <h3>
            Manage predefined delivery methods
        </h3>

        {
            state.deliveryMethods.length > 0

                ? <div className="mt-3">
                    {
                        state.deliveryMethods.map((deliveryMethod, index) =>
                            <EditableDeliveryMethod key={`d-m-${index}`} deliveryMethod={deliveryMethod} />
                        )
                    }
                </div>

                : <div className="mt-0 text-muted mb-3">
                    There are no delivery methods created
                </div>
        }

        <AddDeliveryMethodButton />
    </>
};

export default ManageDeliveryMethodsPage;