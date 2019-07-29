
import React from 'react';

import {withRouter} from 'react-router-dom';

class Signout extends React.Component {

    constructor(props) {
        super(props);       
        this.props.signout(); 
        this.props.history.push("/login");
    }

    render() {
        return (

            <>
             User is signout
            </>


        );
    }
}
export default withRouter(Signout);
