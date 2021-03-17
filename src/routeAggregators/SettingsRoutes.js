import AccountSettingsPage from 'pages/User/Other/AccountSettingsPage/AccountSettingsPage';
import ChangePasswordPage from 'pages/User/Other/ChangePasswordPage/ChangePasswordPage';
import DeliveryAddressesPage from 'pages/User/Other/DeliveryAddressesPage/DeliveryAddressesPage';
import SellerInfoPage from 'pages/User/Other/SellerInfoPage/SellerInfoPage';
import React from 'react';
import { Switch } from 'react-router-dom';
import AuthorizedOnlyRoute from 'routeTypes/AuthorizedOnlyRoute';

const SettingsRoutes = () => <>
    <Switch>
        <AuthorizedOnlyRoute exact path='/user/settings' component={AccountSettingsPage} />
        <AuthorizedOnlyRoute path='/user/settings/addresses' component={DeliveryAddressesPage} />
        <AuthorizedOnlyRoute path='/user/settings/seller-info' component={SellerInfoPage} />
        <AuthorizedOnlyRoute path='/user/settings/change-password' component={ChangePasswordPage} />
    </Switch>
</>

export default SettingsRoutes;