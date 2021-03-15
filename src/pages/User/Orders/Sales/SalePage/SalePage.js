import axios from 'axios';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import ItemsPerPage from 'common/components/ItemsPerPage';
import Pagination from 'common/components/Pagination';
import { mapOrderState } from 'common/orderUtils';
import { authorizedRequestHandler } from 'common/utils';
import moment from 'moment';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import OrderItem from '../../components/OrderItem';

const SalePage = (props) => {

    const pageIndexStr = queryString.parse(props.location.search).pageIndex;
    const pageIndex = !pageIndexStr || parseInt(pageIndexStr) == NaN
        ? 1
        : parseInt(pageIndexStr);

    const history = useHistory();
    const location = useLocation();

    const [state, setState] = useState({ loading: true, pagination: null });
    const [locationLoaded, setLocationLoaded] = useState(false);

    useEffect(() => {
        if (!locationLoaded) {
            setLocationLoaded(true);
            return;
        }

        history.push('/refresh');
    }, [location]);

    useEffect(() => {
        const fetch = async () => {
            const itemsPerPage = props.settings.itemsPerPage;
            const queryParams = queryString.stringify({
                pageSize: itemsPerPage,
                pageIndex: pageIndex
            });

            const uri = `/orders-api/orders/seller?${queryParams}`;
            const action = async () => await axios.get(uri);

            await authorizedRequestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setState({ loading: false, pagination: result.data });
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
    else if (state.pagination?.items?.length === 0) return <h3>You have no orders yet</h3>

    const orders = state.pagination.items;
    return <>
        <h3 className="mb-0">
            Sale
        </h3>

        <div className="text-muted mb-3">
            Here are the orders placed as part of your offers
        </div>

        {
            orders.map((order, i) => <div className="bg-white col-12 mb-4 py-2" key={`order-${i}`}>
                <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                    {moment(order.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </div>

                <div className="mt-2 mb-3">
                    Order Id: <i>{order.id}</i> <br />
                    State: {mapOrderState(order.orderState)}
                </div>

                <div>
                    {
                        order.orderItems.map((orderItem, j) =>
                            <OrderItem orderItem={orderItem} key={`oi-${j}`} />
                        )
                    }
                </div>

                <div className="col-12 mb-3 text-right">
                    <h3>Total price: {calculateOrderTotalPrice(order).toFixed(2)} PLN </h3>
                    <Link to={`/user/sale/order/${order.id}`}>
                        Go to details
                    </Link>
                </div>
            </div>
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

function calculateOrderTotalPrice(order) {
    if (!order) return NaN;
    let sum = 0;
    order.orderItems.forEach(oi => sum += oi.quantity * oi.pricePerItem)
    return sum;
}

export default new AwareComponentBuilder()
    .withSettingsAwareness()
    .build(SalePage);