import React from './node_modules/react';
import { Switch, Route } from './node_modules/react-router-dom';

import LandingPage from './LandingPage';
import Charging from './Charging';
import Energy from './Energy';
import Invest from './Invest';
import Network from './Network';
import Pricing from './Pricing';
import AboutUs from './AboutUs';
import Privacy from './Privacy';
import Contact from './Contact';
import Careers from './Careers';
import Forums from './Forums';



const Main = () => (
    <Switch>
        <Route exact path="/" component = {LandingPage} />
        <Route exact path="/charging" component = {Charging} />
        <Route exact path="/energy" component = {Energy} />
        <Route path="/invest" component = {Invest} />
        <Route path="/network" component = {Network} />
        <Route path="/pricing" component = {Pricing} />
        <Route path="/aboutus" component = {AboutUs} />
        <Route path="/privacy" component = {Privacy} />
        <Route path="/contact" component = {Contact} />
        <Route path="/careers" component = {Careers} />
        <Route path="/forums" component = {Forums} />
    </Switch>
)

export default Main;