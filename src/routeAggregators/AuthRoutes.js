import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import NotAuthorizedRouteOnly from '../routeTypes/NotAuthorizedRouteOnly';

const AuthRoutes = () => <>
    <Switch>
        <NotAuthorizedRouteOnly exact path='/auth/sign-in' component={SignInPage} />
    </Switch>
</>

export default AuthRoutes;