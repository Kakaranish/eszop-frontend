import React from 'react';
import { Link } from 'react-router-dom';

const HelperBar = () => {
    return <>
        <nav class="navbar navbar-light bg-light">
            <div className="ml-2">
                <Link to='/categories'>
                    Categories
                </Link>
            </div>
        </nav>
    </>
};

export default HelperBar;