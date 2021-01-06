import React from 'react'
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';
import ProductsPage from './pages/ProductsPage';
import CreateOfferPage from './pages/CreateOfferPage';

const App = () => <>
  <Router>
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Route exact path='/products' component={ProductsPage} />
      <Route exact path='/create/offer' component={CreateOfferPage} />

      <Route path='/error/:code' component={ErrorPage} />
      <Redirect to='/error/404' />
    </Switch>
  </Router>
</>

export default App;