import React, { Component } from "./node_modules/react"
import { Grid, Cell } from './node_modules/react-mdl';

class AboutUs extends Component {
    render() {
        return (
            <Grid>
                <Cell col={1}>
                </Cell>
                <Cell col={10}>
                    <p>Through a passion of electric vehicles and renewable energy, ChargeShare was born. With over 40 electric vehicles offered in the United States today, the availability of charging infrastructure plays a crucial role in the adoption of new vehicles.<br /><br />
                    ChargeShare is fully committed to the future of electric mobility through providing charging stations for electric vehicles. We aim to provide the highest level of service through quality partnerships and customer support.<br /><br />
                    Our stations will provide the highest quality experience through high speed chargers, protective porticos, entertainment kiosks and charging adaptors for alternate vehicles.<br /><br />
                    In an effort to strive towards powering our stations with renewable energy, ChargeShare plans to roll out off-grid solutions upon completion of the initial phase. Building out an extensive network for charging can be costly but will prove to be very lucrative. Our platform is the first of its kind, giving many the opportunity to be a part of our vision through the Invest page.<br /><br />
                    It is in our vision that we may provide a charging network for the people, by the people.<br /><br />
                    We hope that you will share in this vision and we look forward to providing you the best quality charging experience.
                    </p>
                </Cell>
            </Grid>
        )
    }
}
export default AboutUs;