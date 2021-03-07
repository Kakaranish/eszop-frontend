import React from 'react';
import queryString from 'query-string';

const ManageUserPage = (props) => {

    const queryParams = queryString.parse(window.location.search);
    console.log(Object.keys(queryParams));

    if (!Object.keys(queryParams).length)
        return <>
            ManageUserPage
        </>
};

export default ManageUserPage;