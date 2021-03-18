import axios from 'axios';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import { authorizedRequestHandler, mapRoleName } from 'common/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import LockUserButton from './LockUserButton';
import UnlockUserButton from './UnlockUserButton';

const ManageUserPage = (props) => {

    const userId = props.match.params.id;

    const [state, setState] = useState({
        loading: true,
        user: null
    });
    useEffect(() => {
        const fetch = async () => {
            const userUri = `/identity-api/admin/users/${userId}`;
            const userAction = async () => await axios.get(userUri);
            const userResult = await authorizedRequestHandler(userAction,
                { status: 200, callback: result => result },
                { status: -1, callback: result => result }
            );
            setState({
                loading: false,
                user: userResult.data
            });
        };
        fetch();
    }, []);

    if (state.loading) return <></>

    if (!state.user) return <h3>There is no such user</h3>

    return <>
        <div className="bg-white mb-3 px-3 py-3">

            <h3 className="mb-3">User info</h3>

            <div className="mb-3">
                <div>
                    Id: {state.user.id}
                </div>

                <div>
                    Email: {state.user.email}
                </div>

                <div>
                    Role: {mapRoleName(state.user.role)}
                </div>

                <div>
                    Account created at: {moment(state.user.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </div>

                <div>
                    Last login: {moment(state.user.lastLogin).format("YYYY-MM-DD HH:mm:ss")}
                </div>

                <div>
                    Is locked? {!state.user.isLocked ? "no" : "yes"}
                </div>
            </div>

            {
                !state.user.isLocked

                    ?
                    <LockUserButton userId={userId} />

                    :
                    <UnlockUserButton userId={userId} />
            }
        </div>
    </>
};

export default new AwareComponentBuilder()
    .withIdentityAwareness()
    .build(ManageUserPage);