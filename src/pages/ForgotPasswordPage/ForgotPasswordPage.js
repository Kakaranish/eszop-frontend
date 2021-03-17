import axios from 'axios';
import ValidableInput from 'common/components/ValidableInput';
import { EmailRegex, getFormDataJsonFromEvent, requestHandler } from 'common/utils';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ResetPasswordModal from './ResetPasswordModal';

const ForgotPasswordPage = () => {

    const [token, setToken] = useState(null);

    const onReset = async event => {
        event.preventDefault();

        let formDataJson = getFormDataJsonFromEvent(event);

        const resetUri = "/identity-api/password/generate/reset-token";
        const resetAction = async () => await axios.post(resetUri, formDataJson);
        const result = await requestHandler(resetAction,
            {
                status: 200,
                callback: result => {
                    setToken(result.data.resetToken);
                    return result;
                }
            },
            {
                status: -1,
                callback: result => result
            }
        );

        if(result.status !== 200) {
            toast.error(result.data.Message);
        }
    }

    return <>
        
        <ResetPasswordModal token={token} />
        
        <div className="offset-md-2 col-md-8 col-12">
            <h4 className="mb-1">Reset Password</h4>

            <span className="text-muted">
                On this email we will send reset token
            </span>

            <form onSubmit={onReset} className="mt-3">

                <div className="form-group required">
                    <ValidableInput
                        name="email"
                        defaultValue=""
                        placeholder="Email..."
                        regex={EmailRegex}
                        errorMsg="Invalid email"
                    />
                </div>

                <button className="btn btn-success btn-block mt-4">
                    Submit
                </button>
            </form>
        </div>
    </>
};

export default ForgotPasswordPage;