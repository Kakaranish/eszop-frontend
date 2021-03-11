import AdminPanelPage from 'pages/Admin/AdminPanelPage/AdminPanelPage';
import ManageCategoriesPage from 'pages/Admin/ManageCategoriesPage/ManageCategoriesPage';
import ManageDeliveryMethodsPage from 'pages/Admin/ManageDeliveryMethodsPage/ManageDeliveryMethodsPage';
import ManageUserPage from 'pages/Admin/ManageUserPage/ManageUserPage';
import ManageUsersPage from 'pages/Admin/ManageUsersPage/ManageUsersPage';
import React from 'react';
import { Switch } from 'react-router-dom';
import AuthorizedOnlyRoute from 'routeTypes/AuthorizedOnlyRoute';

const AdminRoutes = () => <>
    <Switch>
        <AuthorizedOnlyRoute exact path='/admin/panel' component={AdminPanelPage} roles={["ADMIN", "SUPER_ADMIN"]} />
        <AuthorizedOnlyRoute exact path='/admin/categories' component={ManageCategoriesPage} roles={["SUPER_ADMIN"]} />
        <AuthorizedOnlyRoute exact path='/admin/delivery-methods' component={ManageDeliveryMethodsPage} roles={["SUPER_ADMIN"]} />
        <AuthorizedOnlyRoute exact path='/admin/users' component={ManageUsersPage} roles={["ADMIN", "SUPER_ADMIN"]} />
        <AuthorizedOnlyRoute exact path='/admin/users/:id' component={ManageUserPage} roles={["ADMIN", "SUPER_ADMIN"]} />
    </Switch>
</>

export default AdminRoutes;