import React from 'react';
import axios from 'axios';
import { getFormDataJsonFromEvent, requestHandler } from '../common/utils';

const LoginPage = () => {


    const onSubmit = async event => {
        event.preventDefault();

        let formDataJson = getFormDataJsonFromEvent(event);

        try {
            console.log(formDataJson)


            const uri = '/identity-api/auth/sign-in';
            const action = async () => await axios.post(uri, formDataJson, {
                baseURL: "https://localhost:10000",
                withCredentials: true
            });
            const tokens = await requestHandler(action);
            console.log(tokens);

        } catch (error) {
            console.log(error);
        }
    };

    const onSignOut = async () => {
        const uri = '/identity-api/auth/sign-out';
        const action = async () => await axios.post(uri, {}, {
            baseURL: "https://localhost:10000",
            withCredentials: true
        });
        await requestHandler(action);
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
                Log In
            </button>
        </form>


        <button type="submit" className="btn btn-primary" onClick={onSignOut}>
            Log out
        </button>
    </>
}

export default LoginPage;