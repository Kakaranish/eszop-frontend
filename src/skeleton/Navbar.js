import AwareComponentBuilder from 'common/AwareComponentBuilder';
import React from 'react';
import { Link } from 'react-router-dom';
import UserIndicator from 'UserIndicator';
import CartIndicator from './CartIndicator';
import SearchBar from './SearchBar';

const Navbar = (props) => <>
    <nav className="navbar navbar-dark bg-dark justify-content-between">
        <Link to='/offers' className="navbar-brand ml-2 text-decoration-none">
            eSzop
        </Link>

        <SearchBar />

        <div className="nav navbar-nav flex-row flex-nowrap">
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
</>

export default new AwareComponentBuilder()
    .withIdentityAwareness()
    .build(Navbar);