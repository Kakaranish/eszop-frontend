import { authorizedRequestHandler, getFormDataJsonFromEvent, requestHandler } from 'common/utils';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ValidableInput from 'common/ValidableInput';
import { toast } from 'react-toastify';
import axios from 'axios';
import AwareComponentBuilder from 'common/AwareComponentBuilder';

const SignUpPage = (props) => {

    const history = useHistory();

    const [errorMsg, setErrorMsg] = useState();

    const onSubmit = async event => {
        event.preventDefault();

        let formDataJson = getFormDataJsonFromEvent(event);
        if (formDataJson.password !== formDataJson.repeatPassword) {
            toast.warning("Passwords are not the same");
            return;
        }

        const signUpUri = "/identity-api/auth/sign-up";
        const signUpAction = async () => await axios.post(signUpUri, formDataJson);
        const signUpResult = await requestHandler(signUpAction,
            {
                status: 200,
                callback: result => result
            },
            {
                status: 400,
                callback: result => {
                    setErrorMsg(result.data.Message);
                    return result;
                }
            },
            {
                status: -1,
                callback: result => {
                    toast.warn(`Error ${signUpResult.status}`);
                    return result;
                }
            }
        );
        if (signUpResult.status !== 200) return;

        const getMeUri = "/identity-api/user/me";
        const getMeAction = async () => await axios.get(getMeUri);
        await authorizedRequestHandler(getMeAction,
            {
                status: 200,
                callback: async result => {
                    props.setIdentity(result.data);
                }
            },
            {
                status: -1,
                callback: result => {
                    toast.error(`Error ${result.status}. Please sign out and try again...`);
                    history.push('/refresh');
                }
            }
        );

        const getCartUri = `/carts-api/cart`;
        const getCartAction = async () => await axios.get(getCartUri);
        authorizedRequestHandler(getCartAction,
            {
                status: 200,
                callback: result => {
                    result.data.cartItems.forEach(cartItem => props.addOrUpdateCartItem(cartItem));
                    history.push('/offers');
                }
            },
            {
                status: -1,
                callback: result => {
                    toast.error(`Error ${result.status}. Please sign out and try again...`);
                    history.push('/refresh');
                }
            }
        );
    };

    return <>
        <div className="offset-md-2 col-md-8 col-12 ">
            <h4 className="mb-3">Create your account</h4>

            <form onSubmit={onSubmit} className="needs-validation">
                <div className="form-group">
                    <ValidableInput
                        name="email"
                        type="email"
                        placeholder="Email..."
                        errorMsg="Invalid email format"
                    />
                </div>

                <div className="form-group">
                    <ValidableInput
                        name="password"
                        type="password"
                        placeholder="Password..."
                        regex="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{5,}$"
                        isHtmlErrorMsg={true}
                        errorMsg="Your password must contain:<br/>at least overall 5 characters<br/>at least 1 lowercase character<br/>at least 1 uppercase character<br/>at least 1 digit"
                        tipMsg="Your password must contain:<br/>at least overall 5 characters<br/>at least 1 lowercase character<br/>at least 1 uppercase character<br/>at least 1 digit"
                    />
                </div>

                <div className="form-group mb-1">
                    <ValidableInput
                        name="repeatPassword"
                        type="password"
                        placeholder="Repeat password..."
                        regex="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{5,}$"
                        errorMsg="Repeated password must meet same rules as password"
                    />
                </div>

                <div className={`text-secondary ${!errorMsg && 'mb-3'}`}>
                    Have your already account? Let's&nbsp;
                    <Link to='/auth/sign-in'>
                        sign in
                    </Link>
                </div>

                {
                    errorMsg &&
                    <div className="text-danger mb-2">
                        {errorMsg}
                    </div>
                }

                <button type="submit" className="btn btn-block btn-outline-success">
                    Sign Up
                </button>
            </form>
        </div>
    </>
};

export default new AwareComponentBuilder()
    .withIdentityAwareness()
    .withCartAwareness()
    .build(SignUpPage);