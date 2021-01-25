import React from 'react';
import { Route, Switch } from 'react-router-dom';
import OfferPage from 'pages/OfferPage';
import OffersPage from 'pages/OffersPage';
import AuthorizedOnlyRoute from 'routeTypes/AuthorizedOnlyRoute';
import CreateOfferDraftPage from 'pages/CreateOffer/StageOne/CreateOfferDraftPage';
import EditOfferDraftStageOnePage from 'pages/CreateOffer/StageOne/EditOfferDraftStageOnePage';
import EditOfferDraftStageTwoPage from 'pages/CreateOffer/StageTwo/EditOfferDraftStageTwoPage';

const OfferRoutes = () => <>
    <Switch>
        <Route exact path='/offers' component={OffersPage} />
        <AuthorizedOnlyRoute exact path='/offers/create' component={CreateOfferDraftPage} />
        <AuthorizedOnlyRoute exact path='/offers/create/draft/:id/stage/1' component={EditOfferDraftStageOnePage} />
        <AuthorizedOnlyRoute exact path='/offers/create/draft/:id/stage/2' component={EditOfferDraftStageTwoPage} />
        <Route exact path='/offers/:id' component={OfferPage} />
    </Switch>
</>

export default OfferRoutes;