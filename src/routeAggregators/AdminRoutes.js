import AdminPanelPage from 'pages/Admin/AdminPanelPage/AdminPanelPage';
import ManageCategoriesPage from 'pages/Admin/ManageCategoriesPage/ManageCategoriesPage';
import React from 'react';
import { Switch } from 'react-router-dom';
import AuthorizedOnlyRoute from 'routeTypes/AuthorizedOnlyRoute';

const AdminRoutes = () => <>
    <Switch>
        <AuthorizedOnlyRoute exact path='/admin/panel' component={AdminPanelPage} roles={["ADMIN", "SUPER_ADMIN"]} />
        <AuthorizedOnlyRoute exact path='/admin/categories' component={ManageCategoriesPage} roles={["SUPER_ADMIN"]} />
    </Switch>
</>

export default AdminRoutes;