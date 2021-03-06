import axios from 'axios';
import { getFormDataJsonFromEvent, requestHandler } from 'common/utils';
import queryString from 'query-string';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Select from "react-select";
import { toast } from 'react-toastify';

const SearchBar = () => {

    const history = useHistory();

    const onSearch = async event => {
        event.preventDefault();

        let data = getFormDataJsonFromEvent(event);
        if (!data.searchPhrase) {
            toast.warn("Search phrase cannot be empty");
            return;
        }

        let queryParameters = queryString.parse(window.location.search);
        queryParameters.searchPhrase = data.searchPhrase;
        if (selectedValue) queryParameters.category = selectedValue.value;

        history.push({
            pathname: '/offers',
            search: queryString.stringify(queryParameters)
        });
    };

    const [selectedValue, setSelectedValue] = useState("");
    const onChange = newValue => setSelectedValue(newValue);

    const [state, setState] = useState({
        loaded: false,
        options: []
    });

    const onCategoriesOpen = async () => {
        if (state.loaded) return;
        const categoriesUri = async () => await axios.get("/offers-api/categories");
        const categoriesResult = await requestHandler(categoriesUri);

        const categoryOptions = categoriesResult.map(cat =>
            ({ value: cat.id, label: cat.name })
        );
        setState({
            loaded: true,
            options: categoryOptions
        });
    };

    return <>
        <div className="navbar-nav mr-auto ml-4">
            <form className="form-inline" onSubmit={onSearch}>
                <input
                    name="searchPhrase"
                    className="form-control"
                    type="search"
                    placeholder="Search"
                />

                <div style={{ width: '200px' }}>
                    <Select
                        placeholder="Category"
                        onFocus={onCategoriesOpen}
                        value={selectedValue}
                        onChange={onChange}
                        options={state.options}
                        isClearable={true}
                        styles={
                            {
                                menu: (provided) => ({
                                    ...provided,
                                    minWidth: '240px'
                                })
                            }
                        }
                    />
                </div>

                <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </>
};

export default SearchBar;