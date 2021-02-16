import React from 'react';
import { Switch } from 'react-router-dom';
import SignInPage from 'pages/SignInPage';
import NotAuthorizedRouteOnly from 'routeTypes/NotAuthorizedRouteOnly';
import SignUpPage from 'pages/SignUpPage';

const AuthRoutes = () => <>
    <Switch>
        <NotAuthorizedRouteOnly exact path='/auth/sign-in' component={SignInPage} />
        <NotAuthorizedRouteOnly exact path='/auth/sign-up' component={SignUpPage} />
    </Switch>
</>

export default AuthRoutes;