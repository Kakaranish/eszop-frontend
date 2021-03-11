import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import React, { useEffect, useState } from 'react';
import AddCategoryButton from './AddCategoryButton';
import EditableCategory from './EditableCategory';

const ManageCategoriesPage = () => {

    const [state, setState] = useState({
        loading: true,
        categories: null
    });

    useEffect(() => {
        const fetch = async () => {
            const uri = '/offers-api/categories';
            const action = async () => await axios.get(uri);
            const categories = await authorizedRequestHandler(action);

            setState({
                loading: false,
                categories: categories
            });
        };
        fetch();
    }, []);

    if (state.loading) return <></>

    return <>
        <h3 className="mb-3">
            Manage categories
        </h3>

        {
            state.categories.map((category, index) =>
                <EditableCategory key={`cat-${index}`} category={category} />
            )
        }

        <AddCategoryButton />
    </>
};

export default ManageCategoriesPage;