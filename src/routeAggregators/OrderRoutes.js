import MyOrdersPage from 'pages/MyOrdersPage/MyOrdersPage';
import OrderPage from 'pages/OrderPage/OrderPage';
import React from 'react';
import { Switch } from 'react-router-dom';
import AuthorizedOnlyRoute from 'routeTypes/AuthorizedOnlyRoute';

const OrderRoutes = () => <>
    <Switch>
        <AuthorizedOnlyRoute exact path='/user/orders' component={MyOrdersPage} />
        <AuthorizedOnlyRoute exact path='/user/orders/:id' component={OrderPage} />
    </Switch>
</>

export default OrderRoutes;