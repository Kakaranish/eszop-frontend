import ValidableInput from 'common/components/ValidableInput';
import { BankAccountRegex, EmailRegex } from 'common/utils';
import React from 'react';

const SellerInfoForm = ({ sellerInfo, onSubmit }) => <>
    <form onSubmit={onSubmit}>
        <div className="offset-md-2 col-md-8">
            <h3 className="mb-3">Your seller info</h3>

            <div className="form-group required">
                <label>Contact Email</label>

                <ValidableInput
                    name="contactEmail"
                    defaultValue={sellerInfo.contactEmail ?? ""}
                    placeholder="Email..."
                    regex={EmailRegex}
                    errorMsg="Invalid email"
                />
            </div>

            <div className="form-group required">
                <label>Phone Number</label>

                <ValidableInput
                    name="phoneNumber"
                    placeholder="Phone number"
                    defaultValue={sellerInfo.phoneNumber ?? ""}
                    regex="^[0-9\+\-\s]{3,}$"
                    errorMsg="Hover over the question mark to see valid phone number formats"
                    isHtmlErrorMsg={true}
                    tipMsg={"Valid phone number formats:<br/>+48 123 456 789<br/>123 456 789<br/>123456789"}
                />
            </div>

            <div className="form-group required">
                <label>Bank Account Number</label>

                <div className="mt-n2 mb-2 text-secondary" style={{ fontSize: '0.8rem' }}>
                    Your account number is not visible until someone made order
                </div>

                <ValidableInput
                    name="bankAccountNumber"
                    placeholder="E.g.: 27 1140 2004 0000 3002 0135 5387"
                    defaultValue={sellerInfo.bankAccountNumber ?? ""}
                    regex={BankAccountRegex}
                    errorMsg="Hover over the question mark to see valid bank account number"
                    tipMsg={"Must have such format: 27 1140 2004 0000 3002 0135 5387"}
                />
            </div>

            <div className="form-group">
                <label>
                    Additional information (optional)
                    </label>

                <textarea
                    name="additionalInfo"
                    className="form-control"
                    placeholder="Tell something about yourself :)"
                    defaultValue={sellerInfo.additionalInfo ?? ""}
                >
                </textarea>
            </div>

            <button className="btn btn-block btn-success mt-4">
                Update
            </button>
        </div>
    </form>
</>;

export default SellerInfoForm;