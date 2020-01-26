import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import CodeIcon from '@material-ui/icons/Code';
import {LockOpen, ExitToApp, AssignmentTurnedInOutlined} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        paddingBottom: "10px",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const isAuth = false; // TODO Change with real Auth

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" href={"/"} className={classes.menuButton} color="inherit">
                        <CodeIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Welcome to CoderTips!
                    </Typography>
                    {isAuth
                        ? <Button color="inherit">
                            <ExitToApp/> Logout
                        </Button>
                        : <>
                            <Button color="inherit" href={"/login"}>
                                <LockOpen/> Login
                            </Button>
                            <Button color="inherit" href={"/register"}>
                                <AssignmentTurnedInOutlined/> Register
                            </Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}