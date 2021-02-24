import React from 'react';
import Navbar from './Navbar';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import { Link } from 'react-router-dom';
import CartIndicator from './CartIndicator';
import UserIndicator from 'UserIndicator';

const MainLayout = (props) => <>

    <Navbar />

    <nav className="navbar navbar-light bg-light">
        <div>
            <Link to="/offers" className="btn btn-primary mr-2">
                Offers
            </Link>

            <Link to="/user/addresses" className="btn btn-primary mr-2">
                Delivery Addresses
            </Link>
        </div>

        <div className="my-2 my-sm-0" type="submit">
            {
                !props.identity &&
                <Link to="/auth/sign-in" className="btn btn-primary mr-2">
                    Sign-In
                </Link>
            }

            {
                props.identity && <>
                    <CartIndicator classes="mr-2" />

                    <UserIndicator />
                </>
            }
        </div>
    </nav>

    <div className="container mt-2">
        <div className="p-3 mt-3">
            {props.children}
        </div>
    </div>
</>

export default new AwareComponentBuilder()
    .withIdentityAwareness()
    .build(MainLayout);