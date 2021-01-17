import React from 'react';
import Navbar from './Navbar';

const MainLayout = (props) => {
    return <>
        <Navbar />
        <div className="container mt-2">
            <a className="btn btn-primary mr-2" href="/offers">Offers</a>
            <a className="btn btn-primary mr-2" href="/auth/login">Sign In</a>
            <a className="btn btn-primary mr-2" href="/offers/create">Create Offer</a>
            
            <div className="p-3">
                {props.children}
            </div>
        </div>
    </>
};

export default MainLayout;