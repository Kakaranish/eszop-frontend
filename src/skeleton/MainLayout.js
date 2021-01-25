import React from 'react';
import Navbar from './Navbar';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOutButton';

const MainLayout = (props) => {


    return <>

        <Navbar />

        <div className="container mt-2">

            <Link to="/offers" className="btn btn-primary mr-2">
                Offers
            </Link>

            <Link to="/offers/create" className="btn btn-primary mr-2">
                Create Offer
            </Link>

            {
                !props.identity 
                    ?
                    <Link to="/auth/sign-in" className="btn btn-primary mr-2">
                        Sign-In
                    </Link>
                    
                    :
                    <div className="d-inline-block border border-primary block mr-2">

                        <div className="d-inline-block mr-2">
                            Logged as {props.identity.email}
                        </div>

                        <SignOutButton />

                    </div>
            }

            {
                props.identity &&
                <Link to="/user/offers" className="btn btn-primary mr-2">
                    My Offers
                </Link>
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