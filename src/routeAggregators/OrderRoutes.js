import FillDeliveryInfoPage from 'pages/User/Orders/FillDeliveryInfoPage/FillDeliveryInfoPage';
import OrdersPage from 'pages/User/Orders/OrdersPage/OrdersPage';
import OrderSummaryPage from 'pages/User/Orders/OrderSummaryPage/OrderSummaryPage';
import React from 'react';
import { Switch } from 'react-router-dom';
import AuthorizedOnlyRoute from 'routeTypes/AuthorizedOnlyRoute';

const OrderRoutes = () => <>
    <Switch>
        <AuthorizedOnlyRoute exact path='/user/orders' component={OrdersPage} />
        <AuthorizedOnlyRoute exact path='/user/orders/:id/fill/delivery-info' component={FillDeliveryInfoPage} />
        <AuthorizedOnlyRoute exact path='/user/orders/:id/summary' component={OrderSummaryPage} />
    </Switch>
</>

export default OrderRoutes;