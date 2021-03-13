import axios from 'axios';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import ItemsPerPage from 'common/components/ItemsPerPage';
import ListItem from 'common/components/OfferListItem';
import Pagination from 'common/components/Pagination';
import { requestHandler } from "common/utils";
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const OffersPage = (props) => {

    const queryParams = queryString.parse(props.location.search);
    const pageIndexStr = queryString.parse(props.location.search).pageIndex;
    const pageIndex = !pageIndexStr || parseInt(pageIndexStr) == NaN
        ? 1
        : parseInt(pageIndexStr);
    const categoryId = queryParams.category;

    const history = useHistory();
    const location = useLocation();

    const [locationLoaded, setLocationLoaded] = useState(false);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        if (!locationLoaded) {
            setLocationLoaded(true);
            return;
        }

        history.push('/refresh');
    }, [location]);


    const [state, setState] = useState({ loading: true, pagination: null });

    useEffect(() => {
        const fetch = async () => {
            const itemsPerPage = props.settings.itemsPerPage;
            let currentQueryParams = queryString.parse(props.location.search);

            currentQueryParams.pageSize = itemsPerPage;
            currentQueryParams.pageIndex = pageIndex;
            if (currentQueryParams.category) currentQueryParams.categoryId = currentQueryParams.category;

            const uri = `/offers-api/offers?${queryString.stringify(currentQueryParams)}`;
            const action = async () => await axios.get(uri);

            const pagination = await requestHandler(action);
            setState({ loading: false, pagination: pagination });
        }

        const fetchCategory = async () => {
            const uri = `/offers-api/categories/${categoryId}`;
            const action = async () => await axios.get(uri);
            const categoryResult = await requestHandler(action);
            setCategory(categoryResult);
        };

        fetch();
        if (categoryId) fetchCategory();
    }, [props.settings.itemsPerPage]);

    const onItemsPerPageChange = async newValue => {
        let currentQueryParams = queryString.parse(props.location.search);
        currentQueryParams.pageIndex = 1;

        history.push({
            pathname: props.location.pathname,
            search: queryString.stringify(currentQueryParams)
        });
    };

    if (state.loading) return <h3>Loading...</h3>

    if (!state.pagination?.items?.length) return <h3>No offers found</h3>

    const offers = state.pagination.items;

    return <>
        <div className="container">

            {
                queryParams.searchPhrase &&
                <h3 className="mb-3">
                    Search results for "{queryParams.searchPhrase}"&nbsp;
                    
                    {
                        category &&
                        <>
                            in category "{category.name}""
                        </>
                    }
                </h3>
            }

            {
                !queryParams.searchPhrase && queryParams.category && category && 
                <h3 className="mb-3">
                    Offers in category "{category.name}"
                </h3>
            }

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