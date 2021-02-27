import { authorizedRequestHandler, getFormDataJsonFromEvent } from 'common/utils';
import ValidableInput from 'common/components/ValidableInput';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const Styles = styled.div`
.react-datepicker__input-container {
    width: inherit;
  }
  
  .react-datepicker-wrapper {
    width: 100%;
  }
}`

const UpdateProfileForm = (props) => {

    const { profile } = props;
    const history = useHistory();

    const [dateOfBirth, setDateOfBirth] = useState(profile.dateOfBirth ? new Date(profile.dateOfBirth) : null);

    const onSubmit = async event => {
        event.preventDefault();

        let formDataJson = getFormDataJsonFromEvent(event);
        const momentDateOfBirth = moment(dateOfBirth);
        formDataJson.dateOfBirth = momentDateOfBirth.format('YYYY-MM-DD');

        const uri = `/identity-api/profile-info`
        const action = async () => await axios.put(uri, formDataJson);

        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: () => {
                    toast.success("Profile updated");
                }
            },
            {
                status: -1,
                callback: () => {
                    toast.error("Unknown error");
                    history.push('/refresh');
                }
            }
        );
    };

    return <>
        <form onSubmit={onSubmit}>
            <div className="offset-md-2 col-md-8">
                <h3 className="mb-3">Update profile</h3>

                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <ValidableInput
                        name="firstName"
                        placeholder="First name..."
                        defaultValue={profile.firstName ?? ""}
                        regex="^[a-zA-Z\p{L}\s,.'-]{3,}$"
                        errorMsg="First name must contain only lower/upper characters and those special characters: <b>.</b> <b>,</b> <b>'</b> <b>-</b>"
                        isHtmlErrorMsg={true}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <ValidableInput
                        name="lastName"
                        placeholder="Last name..."
                        defaultValue={profile.lastName ?? ""}
                        regex="^[a-zA-Z\p{L}\s,.'-]{3,}$"
                        errorMsg="Last name must contain only lower/upper characters and those special characters: <b>.</b> <b>,</b> <b>'</b> <b>-</b>"
                        isHtmlErrorMsg={true}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Phone number">Phone Number</label>
                    <ValidableInput
                        name="phoneNumber"
                        placeholder="Phone number"
                        defaultValue={profile.phoneNumber ?? ""}
                        regex="^[0-9\+\-\s]{3,}$"
                        errorMsg="Hover over the question mark to see valid phone number formats"
                        isHtmlErrorMsg={true}
                        tipMsg={"Valid phone number formats:<br/>+48 123 456 789<br/>123 456 789<br/>123456789"}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Phone number">Date of Birth</label>
                    <Styles>
                        <DatePicker
                            selected={dateOfBirth}
                            placeholderText="Date of birth"
                            onChange={date => setDateOfBirth(date)}
                            dateFormat="yyyy-MM-dd"
                            className="form-control"
                            maxDate={new Date()}
                            required
                        />
                    </Styles>
                </div>

                <button className="btn btn-block btn-outline-success mt-4">
                    Update Profile
                </button>
            </div>
        </form>
    </>
};

export default UpdateProfileForm;