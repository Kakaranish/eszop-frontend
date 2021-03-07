import axios from 'axios';
import { authorizedRequestHandler, getFormDataJsonFromEvent, mapRoleName } from 'common/utils';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Select from "react-select";
import { toast } from 'react-toastify';

const ManageUsersPage = (props) => {

    const queryParams = queryString.parse(props.location.search);

    const history = useHistory();
    const location = useLocation();

    const [state, setState] = useState({
        loading: true,
        fetched: false,
        pagination: null
    });

    const [locationLoaded, setLocationLoaded] = useState(false);
    useEffect(() => {
        if (!locationLoaded) {
            setLocationLoaded(true);
            return;
        }

        history.push('/refresh');
    }, [location]);

    const rolesOptions = [
        { value: "USER", label: "User" },
        { value: "ADMIN", label: "Admin" },
        { value: "SUPER_ADMIN", label: "Super Admin" }
    ];
    const [selectedValue, setSelectedValue] = useState(rolesOptions.find(x => x.value === queryParams.role) ?? "");

    useEffect(() => {
        const fetch = async () => {
            let currentQueryParams = queryString.parse(props.location.search);
            const uri = `/identity-api/admin/users?${queryString.stringify(currentQueryParams)}`;
            const action = async () => await axios.get(uri);
            await authorizedRequestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setState({
                            loading: false,
                            fetched: true,
                            pagination: result.data
                        });
                    }
                }
            );
        };

        const requiresFetch = queryParams.searchPhrase || queryParams.role;
        if (requiresFetch) fetch();
        else setState({
            loading: false,
            fetched: false,
            pagination: null
        });
    }, []);

    const onSearch = async event => {
        event.preventDefault();

        let data = getFormDataJsonFromEvent(event);
        if (!data.searchPhrase && !selectedValue) {
            toast.warn("Search phrase or role must be provided");
            return;
        }

        let queryParameters = queryString.parse(window.location.search);
        if (data.searchPhrase) queryParameters.searchPhrase = data.searchPhrase;
        else delete queryParameters.searchPhrase;

        if(selectedValue) queryParameters.role = selectedValue.value;
        else delete queryParameters.role;

        history.push({
            pathname: '/admin/users',
            search: queryString.stringify(queryParameters)
        });
    };

    const renderSearchBar = () => <>
        <h3 className="mb-3">Search users</h3>

        <form className="form-inline mb-3" onSubmit={onSearch}>
            <input
                name="searchPhrase"
                className="form-control"
                type="search"
                defaultValue={queryParams.searchPhrase ?? ""}
                placeholder="Part of email/id"
            />

            <div style={{ width: '200px' }}>
                <Select
                    placeholder="Role"
                    value={selectedValue}
                    onChange={newValue => setSelectedValue(newValue)}
                    options={rolesOptions}
                    isClearable={true}
                />
            </div>

            <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    </>

    if (state.loading) return <></>

    if (!state.fetched) return renderSearchBar();

    if (!state.pagination?.items?.length) return <>
        {renderSearchBar()}

        <h3 className="my-3">
            No search results for the above criteria
        </h3>
    </>

    return <>
        {renderSearchBar()}

        <h3 className="mb-3">
            Results
        </h3>
        {
            state.pagination.items.map(user => <>
                <div className="bg-white mb-3 px-3 py-3">
                    <div>
                        Id: <i>{user.id} </i>
                    </div>

                    <div>
                        Email: <i>{user.email}</i>
                    </div>

                    <div>
                        Role: {mapRoleName(user.role)}

                        <Link className="pull-right" to={`/admin/users/${user.id}`}>
                            Go to details
                        </Link>
                    </div>
                </div>
            </>)
        }
    </>
};

export default ManageUsersPage;