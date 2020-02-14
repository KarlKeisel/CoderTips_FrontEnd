import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Amplify from 'aws-amplify';
import config from './config'

import * as serviceWorker from './serviceWorker';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        oauth: {
            domain: config.cognito.oauth.DOMAIN,
            scope: config.cognito.oauth.SCOPE,
            redirectSignIn: 'http://localhost:3000/',  // TODO Change to real redirect after finished.
            redirectSignOut: 'http://localhost:3000/',
            responseType: config.cognito.oauth.RESPONSE_TYPE,
        }
    }
});


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
