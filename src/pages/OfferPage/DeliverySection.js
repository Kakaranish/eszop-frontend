import React from 'react';

const DeliverySection = ({ offer }) => {
    if (!offer) return <></>

    return <>
        <div className="row bg-white mt-3 py-2">
            <div className="col-12 mt-3">
                <h4>Delivery methods</h4>
                <table class="table table-hover">
                    <tbody>
                        {
                            offer.deliveryMethods.map(deliveryMethod => <>
                                <tr>
                                    <td>{deliveryMethod.name}</td>
                                    <td>{deliveryMethod.price.toFixed(2)} PLN</td>
                                </tr>
                            </>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
};

export default DeliverySection;