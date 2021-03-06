import AwareComponentBuilder from 'common/AwareComponentBuilder';
import React from 'react';
import Navbar from './Navbar';

const MainLayout = (props) => <>

    <Navbar />
    
    <div className="container mt-2">
        <div className="p-3 mt-3">
            {props.children}
        </div>
    </div>
</>

export default new AwareComponentBuilder()
    .withIdentityAwareness()
    .build(MainLayout);