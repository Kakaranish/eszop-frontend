import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { requestHandler } from "../common/utils";

const ProductsPage = () => {

    const [state, setState] = useState({ loading: true });

    useEffect(() => {
        const fetch = async () => {
            const uri = '/api/products';
            const action = async () => await axios.get(uri, {
                baseURL: "http://localhost:5000",
                headers: {
                    
                }
            });
            const products = await requestHandler(action);
            setState({ loading: false, products });
        }

        fetch();
    }, []);


    if (state.loading) return <h3>Loading...</h3>
    else return <>
        <div className="container">
            <h3>Products</h3>
            {
                state.products.map(product => (
                    <div key={product.id}>
                        {product.name} | {product.price}
                    </div>
                ))
            }
        </div>

    </>
}

export default ProductsPage;