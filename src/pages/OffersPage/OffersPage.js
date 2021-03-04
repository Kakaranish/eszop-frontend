import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { requestHandler } from "common/utils";
import ListItem from 'common/components/OfferListItem';
import Pagination from 'common/components/Pagination';
import ItemsPerPage from 'common/components/ItemsPerPage';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

const OffersPage = (props) => {

    const pageIndexStr = queryString.parse(props.location.search).pageIndex;
    const pageIndex = !pageIndexStr || parseInt(pageIndexStr) == NaN
        ? 1
        : parseInt(pageIndexStr);

    const history = useHistory();

    const [state, setState] = useState({ loading: true, pagination: null });

    useEffect(() => {
        const fetch = async () => {
            const itemsPerPage = props.settings.itemsPerPage;
            const queryParams = queryString.stringify({
                pageSize: itemsPerPage,
                pageIndex: pageIndex
            });

            const uri = `/offers-api/offers?${queryParams}`;
            const action = async () => await axios.get(uri);

            const pagination = await requestHandler(action);
            setState({ loading: false, pagination: pagination });
        }

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

    if (state.loading) return <h3>Loading...</h3>

    if (!state.pagination?.items?.length) return <h3>No offers found</h3>

    const offers = state.pagination.items;

    return <>
        <div className="container">
            <h3>Offers</h3>
            {
                offers.map((offer, i) =>
                    <ListItem key={`li-${i}`} offer={offer} />
                )
            }

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
        </div>
    </>
}

export default new AwareComponentBuilder()
    .withSettingsAwareness()
    .build(OffersPage);