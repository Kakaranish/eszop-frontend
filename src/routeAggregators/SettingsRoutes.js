import AccountSettingsPage from 'pages/User/Other/AccountSettingsPage/AccountSettingsPage';
import DeliveryAddressesPage from 'pages/User/Other/DeliveryAddressesPage/DeliveryAddressesPage';
import SellerInfoPage from 'pages/User/Other/SellerInfoPage/SellerInfoPage';
import UpdateProfilePage from 'pages/User/Other/UpdateProfileInfoPage/UpdateProfilePage';
import React from 'react';
import { Switch } from 'react-router-dom';
import AuthorizedOnlyRoute from 'routeTypes/AuthorizedOnlyRoute';

const SettingsRoutes = () => <>
    <Switch>
        <AuthorizedOnlyRoute exact path='/user/settings' component={AccountSettingsPage} />
        <AuthorizedOnlyRoute path='/user/settings/addresses' component={DeliveryAddressesPage} />
        <AuthorizedOnlyRoute path='/user/settings/seller-info' component={SellerInfoPage} />
        <AuthorizedOnlyRoute path='/user/settings/profile' component={UpdateProfilePage} />
    </Switch>
</>

export default SettingsRoutes;