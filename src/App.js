import 'bootstrap/dist/css/bootstrap.min.css';
import RefreshPage from 'pages/RefreshPage';
import SellerPage from 'pages/SellerPage/SellerPage';
import CartPage from 'pages/User/Other/CartPage/CartPage';
import DeliveryAddressesPage from 'pages/User/Other/DeliveryAddressesPage/DeliveryAddressesPage';
import SellerInfoPage from 'pages/User/Other/SellerInfoPage/SellerInfoPage';
import UpdateProfilePage from 'pages/User/Other/UpdateProfileInfoPage/UpdateProfilePage';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import OrderRoutes from 'routeAggregators/OrderRoutes';
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
          
          <AuthorizedOnlyRoute path='/user/offers' component={MyOffersPage} />
          <AuthorizedOnlyRoute path='/user/profile' component={UpdateProfilePage} />

          <Route path='/seller/:id' component={SellerPage} />

          <Route path='/auth' component={AuthRoutes} />
          <AuthorizedOnlyRoute path='/user/orders' component={OrderRoutes} />
          <AuthorizedOnlyRoute path='/user/addresses' component={DeliveryAddressesPage} />
          <AuthorizedOnlyRoute path='/user/seller-info' component={SellerInfoPage} />

          <AuthorizedOnlyRoute path="/cart" component={CartPage} />

          <Route path='/error/:code' component={ErrorPage} />
          <Route path='/refresh' component={RefreshPage} />
          <Redirect to='/error/404' />
        </Switch>
      </MainLayout>
    </Router>
  </div>
</>

export default App;