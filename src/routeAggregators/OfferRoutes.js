import OfferPage from 'pages/OfferPage/OfferPage';
import OffersPage from 'pages/OffersPage/OffersPage';
import EditOfferDraftStageOnePage from 'pages/User/Offers/CreateOfferPage/StageOne/EditOfferDraftStageOnePage';
import EditOfferDraftStageTwoPage from 'pages/User/Offers/CreateOfferPage/StageTwo/EditOfferDraftStageTwoPage';
import CreateOfferDraftPage from 'pages/User/Offers/CreateOfferPage/StageOne/CreateOfferDraftPage';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthorizedOnlyRoute from 'routeTypes/AuthorizedOnlyRoute';

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