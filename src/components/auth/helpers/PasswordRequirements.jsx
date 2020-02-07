// Used to visualize Cognito password requirements, set to the 'hardest' password setting
// Expects password and password2 (To verify matching)

import React from 'react';

import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    secure: {
        color: "green"
    },
    notSecure: {
        color: "black"
    },
}));

export default function PasswordRequirements(props) {
    const classes = useStyles();

    return (
        <>
            <h3>Secure Passwords Are:</h3>
            <p className={props.password.length > 7 ? classes.secure : classes.notSecure}>
                Minimum of 8 characters
            </p>
            <p className={props.password.match(/[0-9]+/) != null ? classes.secure : classes.notSecure}>
                Have at least one number
            </p>
            <p className={props.password.match(/[$&+,:;=?@#|'<>.\-^*()%!]/) != null ? classes.secure : classes.notSecure}>
                Have at least one special character like ! $ % ( ) *
            </p>
            <p className={props.password.match(/[A-Z]/) != null ? classes.secure : classes.notSecure}>
                Have at least one CAPITAL letter
            </p>
            <p className={props.password.match(/[a-z]/) != null ? classes.secure : classes.notSecure}>
                Have at least one lowercase letter
            </p>
            <p className={props.password === props.password2 && props.password.length > 7 ? classes.secure : classes.notSecure}>
                Your passwords must match
            </p>
        </>
    )
}