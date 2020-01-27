import React from 'react';
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core";

// TODO Finish Footer

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        backgroundColor: '#3f50b5', // TODO Fix to import color from a main color file.
        color: '#fff'
    },
}));

function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h1>Footer Area</h1>
        </div>
    )
}

export default Footer