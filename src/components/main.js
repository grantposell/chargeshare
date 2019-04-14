import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './landingpage';
import Invest from './invest';
import Network from './network';
import Pricing from './pricing';
import AboutUs from './aboutus';
import Privacy from './privacy';
import Contact from './contact';
import Careers from './careers';
import Forums from './forums';
import Support from './support';

const Main = () => (
    <Switch>
        <Route exact path="/" component = {LandingPage} />
        <Route path="/invest" component = {Invest} />
        <Route path="/network" component = {Network} />
        <Route path="/pricing" component = {Pricing} />
        <Route path="/aboutus" component = {AboutUs} />
        <Route path="/privacy" component = {Privacy} />
        <Route path="/contact" component = {Contact} />
        <Route path="/careers" component = {Careers} />
        <Route path="/forums" component = {Forums} />
        <Route path="/support" component = {Support} />
    </Switch>
)

export default Main;