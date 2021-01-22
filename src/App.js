import React from 'react'
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';
import MainLayout from './skeleton/MainLayout';
import AuthRoutes from './routeAggregators/AuthRoutes';
import OfferRoutes from './routeAggregators/OfferRotues';
import MyOffersPage from './pages/User/MyOffersPage';
import NotificationHandler from './skeleton/NotificationHandler';
import AuthorizedOnlyRoute from './routeTypes/AuthorizedOnlyRoute';

const App = () => <>

  <NotificationHandler />

  <div className="container py-3">
    <Router>
      <MainLayout>
        <Switch>
          <Route exact path='/' component={MainPage} />

          <AuthorizedOnlyRoute path='/user/offers' component={MyOffersPage} />

          <Route path='/auth' component={AuthRoutes} />
          <Route path='/offers' component={OfferRoutes} />F

          <Route path='/error/:code' component={ErrorPage} />
          <Redirect to='/error/404' />
        </Switch>
      </MainLayout>
    </Router>
  </div>
</>

export default App;