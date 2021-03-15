import SaleOrderPage from 'pages/User/Orders/Sales/SaleOrderPage/SaleOrderPage';
import SalePage from 'pages/User/Orders/Sales/SalePage/SalePage';
import React from 'react';
import { Switch } from 'react-router';
import AuthorizedOnlyRoute from 'routeTypes/AuthorizedOnlyRoute';

const SaleRoutes = () => <>
    <Switch>
        <AuthorizedOnlyRoute exact path='/user/sale' component={SalePage} />
        <AuthorizedOnlyRoute exact path='/user/sale/order/:id' component={SaleOrderPage} />
    </Switch>
</>

export default SaleRoutes;