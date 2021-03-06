import axios from 'axios';
import { requestHandler } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {

    const [state, setState] = useState({
        loading: true,
        categories: null
    });

    useEffect(() => {
        const fetch = async () => {
            const uri = "/offers-api/categories";
            const action = async () => await axios.get(uri);
            await requestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setState({
                            loading: false,
                            categories: result.data
                        });
                    }
                }
            );
        };
        fetch();
    }, []);

    if (state.loading) return <></>

    if (!state.categories?.length) return <>
        <h3>No categories found</h3>
    </>

    return <>
        
        <h3 className="mb-3">
            Browse categories
        </h3>
        {
            state.categories.map((category, index) => <>
                <p>
                    <Link to={`/offers?category=${category.id}`}>
                        {category.name}
                    </Link>
                </p>
            </>)
        }
    </>
};

export default CategoriesPage;