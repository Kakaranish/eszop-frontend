import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const EditOfferDraftStageTwoPage = (props) => {

    const offerId = props.match.params.id;
    const history = useHistory();

    return <>

        <div className="row">
            <div className="col-6">
                <Link to={`/offers/create/draft/${offerId}/stage/1`}
                    className="btn btn-primary btn-block">
                    Go to stage 1
                </Link>
            </div>

            <div className="col-6">
                <Link to={`/offers/create/draft/${offerId}/stage/1`}
                    className="btn btn-success btn-block">
                    Publish offer
                </Link>
            </div>
        </div>
    </>
};

export default EditOfferDraftStageTwoPage;