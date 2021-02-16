import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { authorizedRequestHandler, getFormDataJsonFromEvent, requestHandler } from 'common/utils';
import AwareComponentBuilder from 'common/AwareComponentBuilder';

const SignInPage = (props) => {

    const history = useHistory();

    const onSubmit = async event => {
        event.preventDefault();

        let formDataJson = getFormDataJsonFromEvent(event);

        const signInUri = "/identity-api/auth/sign-in";
        const signInAction = async () => await axios.post(signInUri, formDataJson);
        await requestHandler(signInAction);

        const getMeUri = "/identity-api/user/me";
        const getMeAction = async () => await axios.get(getMeUri);
        await requestHandler(getMeAction, {
            status: 200,
            callback: async getMeResult => {
                props.setIdentity(getMeResult);
            }
        });

        const getCartUri = `/carts-api/cart`;
        const getCartAction = async () => await axios.get(getCartUri);

        authorizedRequestHandler(getCartAction, {
            status: 200,
            callback: result => {
                result.cartItems.forEach(cartItem => props.addOrUpdateCartItem(cartItem));
                history.push('/');
            }
        });
    };

    return <>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input name="email" type="email" className="form-control" id="emailInput" placeholder="Email..." required />
            </div>
            <div className="form-group">
                <input name="password" type="password" className="form-control" id="passwordInput" placeholder="Password..." required />
            </div>

            <button type="submit" className="btn btn-primary">
                Sign In
            </button>
        </form>
    </>
}

export default new AwareComponentBuilder()
    .withIdentityAwareness()
    .withCartAwareness()
    .build(SignInPage);