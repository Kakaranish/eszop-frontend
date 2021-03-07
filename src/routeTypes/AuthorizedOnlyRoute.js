import AwareComponentBuilder from 'common/AwareComponentBuilder';
import { ensureAccessTokenIsValid, isAccessTokenExpCookiePresent } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthorizedOnlyRoute = ({ component: Component, ...rest }) => {

    const history = useHistory();
    const allowedRoles = (rest.roles ?? []).map(role => role.toUpperCase());

    const [state, setState] = useState({ loading: true });
    useEffect(() => {
        const performAction = async () => {
            if (!rest.identity || !isAccessTokenExpCookiePresent() || !(await ensureAccessTokenIsValid())) {
                toast.warn("This page requires being logged in. Redirecting...")
                history.push('/auth/sign-in');
                return;
            }

            const hasAllowedRole = allowedRoles.length === 0 || allowedRoles.includes(rest.identity.role);
            if (!hasAllowedRole) {
                toast.error("You are not allowed in here")
                history.push('/offers');
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