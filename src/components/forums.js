import React, { Component } from './node_modules/react';
import { Grid, Cell } from './node_modules/react-mdl';

class Forums extends Component {
    render() {
        return (
            <div>
                <Grid>
                    <Cell col={1}>
                    <p>Hi, this is forums</p>
                    </Cell>
                </Grid>
            </div>
        )
    }
}
export default Forums;