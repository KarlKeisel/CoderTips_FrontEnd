import React from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core";

// TODO Finish styling on FormErrors

const useStyles = makeStyles(theme => ({
    error: {
        color: "red",
    },
}));

function FormErrors(props) {
    const classes = useStyles();
    if (props.formerrors && props.formerrors.cognito) {
        return (
            <div className={classes.error}>
            {props.formerrors.cognito.message}
        </div>
        )
    } else {
        return (
            <div />
        )
    }
}

export default FormErrors