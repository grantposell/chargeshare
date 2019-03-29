import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './landingpage';
import Invest from './invest';
import Network from './network';
import Pricing from './pricing';
import AboutUs from './aboutus';

const Main = () => (
    <Switch>
        <Route exact path="/" component = {LandingPage} />
        <Route path="/invest" component = {Invest} />
        <Route path="/network" component = {Network} />
        <Route path="/pricing" component = {Pricing} />
        <Route path="/aboutus" component = {AboutUs} />
    </Switch>
)

export default Main;