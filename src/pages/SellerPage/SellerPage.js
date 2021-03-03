import axios from 'axios';
import { requestHandler } from 'common/utils';
import ListItem from 'pages/User/Offers/MyOffersPage/ListItem';
import React, { useEffect, useState } from 'react';

const SellerPage = (props) => {

    const sellerId = props.match.params.id;

    const [state, setState] = useState({
        loading: true,
        sellerInfo: null,
        offers: null
    });

    useEffect(() => {
        const fetch = async () => {
            const sellerInfoUri = `/identity-api/seller/${sellerId}`;
            const sellerInfoAction = async () => await axios.get(sellerInfoUri);

            const sellerInfoResult = await requestHandler(sellerInfoAction,
                { status: 200, callback: result => result });
            if (sellerInfoResult.status !== 200) return;

            const offersUri = `/offers-api/offers/seller/${sellerId}`;
            const offersAction = async () => await axios.get(offersUri);

            await requestHandler(offersAction,
                {
                    status: 200,
                    callback: result => {
                        setState({
                            loading: false,
                            sellerInfo: sellerInfoResult.data,
                            offers: result.data.items
                        });
                    }
                }
            );
        };
        fetch();
    }, []);

    if (state.loading) return <></>

    return <>
        <div className="mb-4 px-3 py-2 border rounded" style={{ backgroundColor: 'white' }}>
            <h3>About seller</h3>

            <div>
                <b>Id: </b> {sellerId}
            </div>

            {
                state.sellerInfo.contactEmail &&
                <div>
                    <b>Contact email:</b>&nbsp;
                    {state.sellerInfo.contactEmail}
                </div>
            }

            {
                state.sellerInfo.phoneNumber &&
                <div>
                    <b>Phone number:  </b>
                    {state.sellerInfo.phoneNumber}
                </div>
            }

            {
                state.sellerInfo.additionalInfo &&
                <div>
                    <b>Additional info: </b>
                    {state.sellerInfo.additionalInfo}
                </div>
            }
        </div>

        <div>
            {
                state.offers?.length > 0

                    ?
                    <>
                        <h3 className="mb-2">Offers</h3>
                        {
                            state.offers.map((offer, i) =>
                                <ListItem key={`li-${i}`} offer={offer} />
                            )
                        }
                    </>

                    : <h3>This seller has no offers available</h3>
            }
        </div>
    </>
};

export default SellerPage;