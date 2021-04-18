import React, { useState, useEffect } from 'react';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import { useHistory, Route } from 'react-router-dom';
import { isAccessTokenExpired } from 'common/utils';
import { toast } from 'react-toastify';

const NotAuthorizedRouteOnly = ({ component: Component, ...rest }) => {

    const history = useHistory();

    const [state, setState] = useState({ loading: true });
    useEffect(() => {
        const verify = async () => {
            if (rest.identity || !isAccessTokenExpired()) {
                toast.warn("This page requires not to be logged in. Redirecting to main page...")
                history.push('/offers');
                return;
            }

            setState({ loading: false });
        };

        verify();
    }, []);

    if (state.loading) return <></>
    else return <Route {...rest} render={matchProps => (
        <Component {...matchProps} />
    )} />
};

export default new AwareComponentBuilder()
    .withIdentityAwareness()
    .build(NotAuthorizedRouteOnly);