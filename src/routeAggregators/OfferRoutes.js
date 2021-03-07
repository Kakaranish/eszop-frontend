import OfferPage from 'pages/OfferPage/OfferPage';
import OffersPage from 'pages/OffersPage/OffersPage';
import CreateOfferDraftPage from 'pages/User/Offers/CreateOfferPage/StageOne/CreateOfferDraftPage';
import EditOfferDraftStageTwoPage from 'pages/User/Offers/CreateOfferPage/StageTwo/EditOfferDraftStageTwoPage';
import EditActiveOfferPage from 'pages/User/Offers/EditActiveOfferPage/EditActiveOfferPage';
import EditOfferDraftPage from 'pages/User/Offers/EditOfferDraftPage/EditOfferDraftPage';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthorizedOnlyRoute from 'routeTypes/AuthorizedOnlyRoute';

const OfferRoutes = () => <>
    <Switch>
        <Route exact path='/offers' component={OffersPage} />
        <AuthorizedOnlyRoute exact path='/offers/create' component={CreateOfferDraftPage} />
        <AuthorizedOnlyRoute exact path='/offers/create/draft/:id/stage/1' component={EditOfferDraftPage} />
        <AuthorizedOnlyRoute exact path='/offers/create/draft/:id/stage/2' component={EditOfferDraftStageTwoPage} />
        <AuthorizedOnlyRoute exact path='/offers/:id/edit' component={EditActiveOfferPage} />
        <Route exact path='/offers/:id' component={OfferPage} />
    </Switch>
</>

export default OfferRoutes;