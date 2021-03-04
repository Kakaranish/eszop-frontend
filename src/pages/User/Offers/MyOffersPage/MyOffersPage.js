import axios from 'axios';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import ItemsPerPage from 'common/components/ItemsPerPage';
import OfferListItem from 'common/components/OfferListItem';
import Pagination from 'common/components/Pagination';
import { requestHandler } from 'common/utils';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const MyOffersPage = (props) => {

    const pageIndexStr = queryString.parse(props.location.search).pageIndex;
    const pageIndex = !pageIndexStr || parseInt(pageIndexStr) == NaN
        ? 1
        : parseInt(pageIndexStr);

    const history = useHistory();

    const [state, setState] = useState({
        loading: true,
        offers: []
    });

    useEffect(() => {
        const fetch = async () => {
            const itemsPerPage = props.settings.itemsPerPage;
            const queryParams = queryString.stringify({
                pageSize: itemsPerPage,
                pageIndex: pageIndex
            });

            const uri = `/offers-api/offers/my?${queryParams}`;
            const action = async () => await axios.get(uri);

            await requestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setState({
                            loading: false,
                            pagination: result.data
                        });
                    }
                }
            );
        };

        fetch();
    }, []);

    if (state.loading) return <></>

    if (!state.pagination?.items?.length) return <div>
        <h3>You have no offer already</h3>
        <Link to='/offers/create' className="btn btn-outline-success">
            Create Offer
        </Link>
    </div>

    const offers = state.pagination.items;

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

    return <>
        <h3>My offers</h3>
        {
            offers.map((offer, i) =>
                <OfferListItem key={`li=${i}`} offer={offer} />
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
    </>
};

export default new AwareComponentBuilder()
    .withSettingsAwareness()
    .build(MyOffersPage);