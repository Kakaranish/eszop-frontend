import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => <>
    <nav className="navbar navbar-dark bg-dark justify-content-between">
        <Link to='/offers' className="text-decoration-none">
            <div className="navbar-brand d-flex align-items-center ml-2">
                <div>
                    eSzop
                </div>
            </div>
        </Link>
    </nav>
</>

export default Navbar;