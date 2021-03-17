import 'bootstrap/dist/css/bootstrap.min.css';
import CategoriesPage from 'pages/CategoriesPage/CategoriesPage';
import ForgotPasswordPage from 'pages/ForgotPasswordPage/ForgotPasswordPage';
import RefreshPage from 'pages/RefreshPage';
import ResetPasswordPage from 'pages/ResetPasswordPage/ResetPasswordPage';
import SellerPage from 'pages/SellerPage/SellerPage';
import CartPage from 'pages/User/Other/CartPage/CartPage';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AdminRoutes from 'routeAggregators/AdminRoutes';
import SaleRoutes from 'routeAggregators/SaleRoutes';
import SettingsRoutes from 'routeAggregators/SettingsRoutes';
import ShoppingRoutes from 'routeAggregators/ShoppingRoutes';
import NotAuthorizedRouteOnly from 'routeTypes/NotAuthorizedRouteOnly';
import ErrorPage from './pages/ErrorPage';
import MyOffersPage from './pages/User/Offers/MyOffersPage/MyOffersPage';
import AuthRoutes from './routeAggregators/AuthRoutes';
import OfferRoutes from './routeAggregators/OfferRoutes';
import AuthorizedOnlyRoute from './routeTypes/AuthorizedOnlyRoute';
import MainLayout from './skeleton/MainLayout';
import NotificationHandler from './skeleton/NotificationHandler';

const App = () => <>

  <NotificationHandler />

  <div className="container pb-3">
    <Router>
      <MainLayout>
        <Switch>
          <Redirect exact path='/' to='/offers' />

          <Route path='/offers' component={OfferRoutes} />
          <Route path='/user/settings' component={SettingsRoutes} />
          <Route path='/auth' component={AuthRoutes} />
          <AuthorizedOnlyRoute path='/user/shopping' component={ShoppingRoutes} />
          <AuthorizedOnlyRoute path='/user/sale' component={SaleRoutes} />
          <AuthorizedOnlyRoute path='/admin' component={AdminRoutes} roles={["ADMIN", "SUPER_ADMIN"]} />

          <AuthorizedOnlyRoute path='/user/offers' component={MyOffersPage} />
          <AuthorizedOnlyRoute path="/cart" component={CartPage} />

          <NotAuthorizedRouteOnly path='/forgot-password' component={ForgotPasswordPage} />
          <NotAuthorizedRouteOnly path='/reset-password' component={ResetPasswordPage} />
          <Route path='/categories' component={CategoriesPage} />
          <Route path='/seller/:id' component={SellerPage} />

          <Route path='/error/:code' component={ErrorPage} />
          <Route path='/refresh' component={RefreshPage} />
          <Redirect to='/error/404' />
        </Switch>
      </MainLayout>
    </Router>
  </div>
</>

export default App;