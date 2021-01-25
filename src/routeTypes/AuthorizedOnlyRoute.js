import React, { useState, useEffect } from 'react';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import { useHistory, Route } from 'react-router-dom';
import { ensureAccessTokenIsValid, isAccessTokenExpCookiePresent } from 'common/utils';

const AuthorizedOnlyRoute = ({ component: Component, ...rest }) => {

    const history = useHistory();
    const allowedRoles = (rest.roles ?? []).map(role => role.toLowerCase());

    const [state, setState] = useState({ loading: true });
    useEffect(() => {
        const performAction = async () => {
            if (!rest.identity || !isAccessTokenExpCookiePresent() || !(await ensureAccessTokenIsValid())) {
                alert('This page requires to be logged in. Redirecting to login page...');
                history.push('/auth/sign-in');
                return;
            }

            const hasAllowedRole = allowedRoles.length === 0 || allowedRoles.includes(rest.identity.role);
            if (!hasAllowedRole) {
                alert(`Set of allowed roles is [${allowedRoles.join(',')}]. Your is ${rest.identity.role ?? "undefined"}`);
                history.push('/');
                return;
            }

            setState({ loading: false });
        };

        performAction();
    }, []);

    if (state.loading) return <></>
    else return <Route {...rest} render={matchProps => (
        <Component {...matchProps} />
    )} />
};

export default new AwareComponentBuilder()
    .withIdentityAwareness()
    .build(AuthorizedOnlyRoute);