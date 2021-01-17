import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';

const AuthRoutes = () => <>
    <Switch>
        <Route exact path='/auth/sign-in' component={SignInPage} />
    </Switch>
</>

export default AuthRoutes;