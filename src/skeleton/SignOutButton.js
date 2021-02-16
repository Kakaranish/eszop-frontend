import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import { requestHandler } from 'common/utils';

const SignOutButton = (props) => {

    const history = useHistory();

    const onSignOut = async () => {
        const uri = '/identity-api/auth/sign-out';
        const action = async () => await axios.post(uri, {});
        await requestHandler(action, {
            status: 200,
            callback: () => {
                props.unsetIdentity();
                props.clearCart();
                history.push('/');
            }
        });
    };

    return <>
        <button type="submit" className="btn btn-primary" onClick={onSignOut}>
            Log out
        </button>
    </>
};

export default new AwareComponentBuilder()
    .withIdentityAwareness()
    .withCartAwareness()
    .build(SignOutButton);