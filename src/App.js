import 'bootstrap/dist/css/bootstrap.min.css';
import CategoriesPage from 'pages/CategoriesPage/CategoriesPage';
import RefreshPage from 'pages/RefreshPage';
import SellerPage from 'pages/SellerPage/SellerPage';
import CartPage from 'pages/User/Other/CartPage/CartPage';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import OrderRoutes from 'routeAggregators/OrderRoutes';
import SettingsRoutes from 'routeAggregators/SettingsRoutes';
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
          
          <AuthorizedOnlyRoute path='/user/orders' component={OrderRoutes} />
          <AuthorizedOnlyRoute path='/user/offers' component={MyOffersPage} />
          <AuthorizedOnlyRoute path="/cart" component={CartPage} />
          
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