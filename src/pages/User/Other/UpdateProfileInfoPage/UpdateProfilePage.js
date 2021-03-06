import axios from 'axios';
import { requestHandler } from 'common/utils';
import React, { useEffect, useState } from 'react';
import UpdateProfileForm from './UpdateProfileForm';

const UpdateProfilePage = () => {

    const [state, setState] = useState({
        loading: true,
        profile: null
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const uri = `/identity-api/profile-info`
            const action = async () => await axios.get(uri);
            await requestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setState({
                            loading: false,
                            profile: result.data
                        });
                    }
                },
                {
                    status: 204,
                    callback: () => {
                        setState({
                            loading: false,
                            profile: null
                        });
                    }
                }
            );
        };

        fetchProfile();
    }, []);

    if (state.loading) return <></>

    return <>
        <div className="offset-md-2 col-md-8">
            <h3 className="mb-3">
                Update profile
            </h3>

            <UpdateProfileForm profile={state.profile ?? {}} />
        </div>
    </>
};

export default UpdateProfilePage;