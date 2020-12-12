import React from 'react'
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';

const App = () => <>
  <Router>
    <Switch>

      <Route exact path='/' component={MainPage} />

      <Route path='/error/:code' component={ErrorPage} />
      <Redirect to='/error/404' />
    </Switch>
  </Router>
</>

export default App;