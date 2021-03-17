import axios from 'axios';
import ValidableInput from 'common/components/ValidableInput';
import { authorizedRequestHandler, getFormDataJsonFromEvent } from 'common/utils';
import React from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

const ChangePasswordPage = () => {

    const history = useHistory();
    
    const onSubmit = async event => {
        event.preventDefault();

        let formDataJson = getFormDataJsonFromEvent(event);
        if (formDataJson.newPassword !== formDataJson.repeatPassword) {
            toast.warning("Passwords are not the same");
            return;
        }

        const uri = "/identity-api/password/change";
        const action = async () => await axios.post(uri, formDataJson);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: () => {
                    toast.success("Password changed!")
                    history.push('/user/settings');
                }
            },
            {
                status: 400,
                callback: result => {
                    toast.error(result.data.Message);
                }
            },
            {
                status: -1,
                callback: result => {
                    toast.warn(`Error ${result.status}`);
                }
            }
        );
    };

    return <>
        <div className="offset-md-2 col-md-8 col-12">

            <h4 className="mb-1">Change password</h4>

            <form onSubmit={onSubmit} className="mt-3">

                <div className="form-group required mb-2">
                    <label htmlFor="oldPassword">Old password</label>

                    <ValidableInput
                        name="oldPassword"
                        type="password"
                        placeholder="Old password..."
                        regex="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{5,}$"
                        errorMsg="Invalid password"
                    />
                </div>

                <div className="form-group required">
                    <label htmlFor="email">Password</label>

                    <ValidableInput
                        name="newPassword"
                        type="password"
                        placeholder="New password..."
                        regex="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{5,}$"
                        isHtmlErrorMsg={true}
                        errorMsg="Your password must contain:<br/>at least overall 5 characters<br/>at least 1 lowercase character<br/>at least 1 uppercase character<br/>at least 1 digit"
                        tipMsg="Your password must contain:<br/>at least overall 5 characters<br/>at least 1 lowercase character<br/>at least 1 uppercase character<br/>at least 1 digit"
                    />
                </div>

                <div className="form-group required mb-1">
                    <label htmlFor="repeatPassword">Repeat password</label>

                    <ValidableInput
                        name="repeatPassword"
                        type="password"
                        placeholder="Repeat password..."
                        regex="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{5,}$"
                        errorMsg="Repeated password must meet same rules as password"
                    />
                </div>

                <button className="btn btn-success btn-block mt-4">
                    Submit
                </button>
            </form>
        </div>
    </>
};

export default ChangePasswordPage;