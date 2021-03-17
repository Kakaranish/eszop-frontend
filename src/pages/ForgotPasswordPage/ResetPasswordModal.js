import React from 'react';
import HyperModal from 'react-hyper-modal';
import { useHistory } from 'react-router-dom';

const ResetPasswordModal = (props) => {

    const { token } = props;

    const history = useHistory();

    const goToResetPage = () => {
        history.push('/reset-password');
    };

    if(!token) return <></>

    return <>
        <HyperModal
            isOpen={true}
            classes={{ contentClassName: "z-999 h-100 d-flex", wrapperClassName: "z-999" }}
            afterClose={goToResetPage}
        >
            <div className="col-12 offset-lg-3 col-lg-6 mt-4 mb-4 align-self-center">

                <h3 className="mb-1">
                    Copy reset token
                </h3>

                <div className="text-muted mb-4">
                    You would normally receive this token by email... but mail service is not prepared yet :D
                </div>

                <div className="" style={{color: 'chocolate', overflowWrap: 'break-word'}}>
                    {token}
                </div>

                <button className="btn btn-block btn-success mt-4" onClick={goToResetPage}>
                    Go to reset password page >>
                </button>
            </div>
        </HyperModal>
    </>
};

export default ResetPasswordModal;