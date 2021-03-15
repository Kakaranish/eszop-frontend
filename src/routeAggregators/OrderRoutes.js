import FillDeliveryInfoPage from 'pages/User/Shopping/FillDeliveryInfoPage/FillDeliveryInfoPage';
import ShoppingOrderPage from 'pages/User/Shopping/ShoppingOrderPage/ShoppingOrderPage';
import ShoppingOrderSummaryPage from 'pages/User/Shopping/ShoppingOrderSummaryPage/ShoppingOrderSummaryPage';
import ShoppingPage from 'pages/User/Shopping/ShoppingPage/ShoppingPage';
import React from 'react';
import { Switch } from 'react-router-dom';
import AuthorizedOnlyRoute from 'routeTypes/AuthorizedOnlyRoute';

const OrderRoutes = () => <>
    <Switch>
        <AuthorizedOnlyRoute exact path='/user/shopping' component={ShoppingPage} />
        <AuthorizedOnlyRoute exact path='/user/shopping/order/:id' component={ShoppingOrderPage} />
        <AuthorizedOnlyRoute exact path='/user/shopping/order/:id/fill/delivery-info' component={FillDeliveryInfoPage} />
        <AuthorizedOnlyRoute exact path='/user/shopping/order/:id/fill/summary' component={ShoppingOrderSummaryPage} />
    </Switch>
</>

export default OrderRoutes;