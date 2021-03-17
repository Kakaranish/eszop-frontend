import axios from 'axios';
import ValidableInput from 'common/components/ValidableInput';
import { EmailRegex, getFormDataJsonFromEvent, requestHandler } from 'common/utils';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {

    const history = useHistory();

    const onReset = async event => {
        event.preventDefault();

        let formDataJson = getFormDataJsonFromEvent(event);
        if (formDataJson.newPassword !== formDataJson.repeatPassword) {
            toast.warning("Passwords are not the same");
            return;
        }

        const uri = "/identity-api/password/reset";
        const action = async () => await axios.post(uri, formDataJson);
        await requestHandler(action,
            {
                status: 200,
                callback: () => {
                    toast.success("Password changed!")
                    history.push('/auth/sign-in');
                }
            },
            {
                status: 400,
                callback: result => {
                    toast.error(result.data.Message);
                    return result;
                }
            },
            {
                status: -1,
                callback: result => {
                    toast.warn(`Error ${result.status}`);
                    return result;
                }
            }
        );
    };

    return <>

        <div className="offset-md-2 col-md-8 col-12">
            <h4 className="mb-1">Reset Password</h4>

            <span className="text-muted">
                On this email we will send reset token
            </span>

            <form onSubmit={onReset} className="mt-3">
                <div className="form-group required">
                    <label htmlFor="email">Email</label>

                    <ValidableInput
                        name="email"
                        defaultValue=""
                        placeholder="Email..."
                        regex={EmailRegex}
                        errorMsg="Invalid email"
                    />
                </div>

                <div className="form-group required">
                    <label htmlFor="email">Reset token</label>

                    <ValidableInput
                        name="resetToken"
                        defaultValue=""
                        placeholder="Reset token..."
                        regex="^\w{20,}$"
                        errorMsg="Invalid reset token"
                    />
                </div>

                <div className="form-group required">
                    <label htmlFor="email">Password</label>

                    <ValidableInput
                        name="newPassword"
                        type="password"
                        placeholder="Password..."
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

export default ResetPasswordPage;