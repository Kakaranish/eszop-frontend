import moment from 'moment';
import React from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { requestHandler } from '../common/utils';
import AwareComponentBuilder from '../common/AwareComponentBuilder';

const MainLayout = (props) => {

    const onSignOut = async () => {
        const uri = '/identity-api/auth/sign-out';
        const action = async () => await axios.post(uri, {});
        await requestHandler(action, {
            status: 200,
            callback: () => {
                props.unsetIdentity();
            }
        });
    };

    const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const accessTokenExp = getCookie("accessTokenExp");
    let isLoggedIn = accessTokenExp === null
        ? false
        : moment.unix(accessTokenExp).isAfter(moment.utc());

    console.log(isLoggedIn);

    return <>
        <Navbar />
        <div className="container mt-2">
            <a className="btn btn-primary mr-2" href="/offers">Offers</a>
            <a className="btn btn-primary mr-2" href="/auth/login">Sign In</a>
            <a className="btn btn-primary mr-2" href="/offers/create">Create Offer</a>

            {
                props.identity &&

                <div className="d-inline-block border border-primary block">

                    <div className="d-inline-block mr-2">
                        Logged as {props.identity.email}
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={onSignOut}>
                        Log out
                    </button>

                </div>
            }

            <div className="p-3">
                {props.children}
            </div>
        </div>
    </>
};

export default new AwareComponentBuilder()
    .withIdentityAwareness()
    .build(MainLayout);