import React from 'react'
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';
import OffersPage from './pages/OffersPage';
import CreateOfferPage from './pages/CreateOfferPage';
import LoginPage from './pages/LoginPage';
import MainLayout from './skeleton/MainLayout';
import OfferPage from './pages/OfferPage';

const App = () => <>

  <div className="container py-3">

    <Router>
      <MainLayout>
        <Switch>
          <Route exact path='/' component={MainPage} />

          <Route exact path='/offers' component={OffersPage} />
          <Route exact path='/offers/create' component={CreateOfferPage} />
          <Route exact path='/offers/:id' component={OfferPage} />
          <Route exact path='/auth/login' component={LoginPage} />

          <Route path='/error/:code' component={ErrorPage} />
          <Redirect to='/error/404' />
        </Switch>
      </MainLayout>
    </Router>
  </div>
</>

export default App;