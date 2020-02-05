import React, {useEffect} from 'react';

import {Auth} from 'aws-amplify';
import {withRouter} from 'react-router-dom';

// TODO Finish Logout

function Logout(props) {

    const awsLogout = () => {
        Auth.signOut()
            .then()
            .catch(err => console.log(err))
    };

    useEffect(() => {
        awsLogout();
        props.auth.setAuthStatus(false);
        props.auth.setUser(null);
        props.history.push("/")
    }, [props.history]);

    return (
        <h1>Logging you out now...</h1>
    )
}

export default withRouter(Logout)