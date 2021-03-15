import SalePage from 'pages/User/Sales/SalePage/SalePage';
import React from 'react';
import { Switch } from 'react-router';
import AuthorizedOnlyRoute from 'routeTypes/AuthorizedOnlyRoute';

const SaleRoutes = () => <>
    <Switch>
        <AuthorizedOnlyRoute exact path='/user/sale' component={SalePage} />
    </Switch>
</>

export default SaleRoutes;