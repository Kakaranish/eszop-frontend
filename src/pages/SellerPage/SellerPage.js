import axios from 'axios';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import ItemsPerPage from 'common/components/ItemsPerPage';
import Pagination from 'common/components/Pagination';
import OfferListItem from 'common/components/OfferListItem';
import { requestHandler } from 'common/utils';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const SellerPage = (props) => {

    const sellerId = props.match.params.id;

    const history = useHistory();

    const pageIndexStr = queryString.parse(props.location.search).pageIndex;
    const pageIndex = !pageIndexStr || parseInt(pageIndexStr) == NaN
        ? 1
        : parseInt(pageIndexStr);

    const [state, setState] = useState({
        loading: true,
        sellerInfo: null,
        pagination: null
    });

    useEffect(() => {
        const fetch = async () => {
            const sellerInfoUri = `/identity-api/seller/${sellerId}`;
            const sellerInfoAction = async () => await axios.get(sellerInfoUri);

            const sellerInfoResult = await requestHandler(sellerInfoAction,
                { status: 200, callback: result => result });
            if (sellerInfoResult.status !== 200) return;

            const itemsPerPage = props.settings.itemsPerPage;
            const queryParams = queryString.stringify({
                pageSize: itemsPerPage,
                pageIndex: pageIndex
            });
            const offersUri = `/offers-api/offers/seller/${sellerId}?${queryParams}`;
            const offersAction = async () => await axios.get(offersUri);

            await requestHandler(offersAction,
                {
                    status: 200,
                    callback: result => {
                        setState({
                            loading: false,
                            sellerInfo: sellerInfoResult.data,
                            pagination: result.data
                        });
                    }
                }
            );
        };
        fetch();
    }, []);

    const onItemsPerPageChange = async newValue => {
        const currentPath = props.location.pathname;
        const queryParams = queryString.stringify({
            pageSize: newValue,
            pageIndex: 1
        });

        history.push({
            pathname: currentPath,
            search: queryParams
        });

        history.push('/refresh');
    };

    if (state.loading) return <></>

    const offers = state.pagination.items;

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
                    <b>Additional info: </b><br />
                    {state.sellerInfo.additionalInfo}
                </div>
            }
        </div>

        <div>
            {
                offers?.length > 0

                    ?
                    <>
                        <h3 className="mb-2">Offers</h3>
                        {
                            offers.map((offer, i) =>
                                <OfferListItem key={`li-${i}`} offer={offer} />
                            )
                        }
                    </>

                    : <h3>This seller has no offers available</h3>
            }
        </div>

        <div className="pull-left">
            <Pagination
                currentPage={pageIndex}
                totalPages={state.pagination.totalPages}
                queryParamName="pageIndex"
                location={Object.assign({}, props.location)}
            />
        </div>

        <div className="pull-right">
            <ItemsPerPage
                onChange={async newValue => onItemsPerPageChange(newValue)}
                classes="d-block"
            />
        </div>
    </>
};

export default new AwareComponentBuilder()
    .withSettingsAwareness()
    .build(SellerPage);