import React, { Component } from './node_modules/react';
import { Grid, Cell } from './node_modules/react-mdl';

class LandingPage extends Component {
    render() {
        return(
            <div style ={{width: '100%', margin: 'auto'}}>
                <Grid className="landing-grid">
                    <Cell col={12}>
                    </Cell>
                </Grid>
            </div>
        )
    }
}
export default LandingPage;