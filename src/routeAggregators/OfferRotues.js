import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateOfferPage from '../pages/CreateOffer/CreateOfferPage';
import OfferPage from '../pages/OfferPage';
import OffersPage from '../pages/OffersPage';

const OfferRoutes = () => <>
    <Switch>
        <Route exact path='/offers' component={OffersPage} />
        <Route exact path='/offers/create' component={CreateOfferPage} />
        <Route exact path='/offers/:id' component={OfferPage} />
    </Switch>
</>

export default OfferRoutes;