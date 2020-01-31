import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {Button, Fab} from "@material-ui/core"

import {Auth} from "aws-amplify";

import {withRouter} from "react-router-dom";

import {ReactComponent as GoogleIcon} from "../assets/icons/goggle-icon.svg";
import {ReactComponent as AmazonIcon} from "../assets/icons/amazon-icon.svg";
import {Facebook, LocationOff} from '@material-ui/icons';

import FormErrors from "../FormErrors";

// TODO Finish Login

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: 500,
    },
}));


function Login(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        showPassword: false,
        errors: {
            cognito: null,
        },
    });

    const clearErrorState = () => {
        setValues({...values, errors: {cognito: null}})
    };

    const handleSubmit = async event => {
        event.preventDefault();

        clearErrorState();
        try {
            const user = await Auth.signIn(values.username, values.password);
            props.auth.setAuthStatus(true);
            props.auth.setUser(user);
            console.log(user);
            props.history.push("/main")
        } catch (error) {  // Sometimes returned as error, or error.message
            let err = null;
            !error.message ? err = {"message": error} : err = error;  // Normalize
            setValues({
                ...values, errors: {cognito: err}
            });
        }
    };

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value})
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <Container fixed>
            <Paper>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <h3>Login Now</h3>
                        <FormErrors formerrors={values.errors}/>
                        <TextField
                            label="User Name"
                            id="outlined-username"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                            onChange={handleChange('username')}
                        />
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                        <br/>
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            className={classes.margin}
                            onClick={handleSubmit}
                        >
                            Login
                        </Button>
                        <br/>
                        <small>Don't have an account?
                            <a href={"/register"}> Register Here </a>
                        </small>
                    </Grid>
                    <Grid item md={6}>
                        <Fab variant={"extended"}>
                            <AmazonIcon
                                width={"25px"}
                                height={"100%"}
                            /> Log in with Amazon
                        </Fab>
                        <br/>
                        <Fab variant={"extended"}>
                            <GoogleIcon
                                width={"20px"}
                            /> Log in with Google
                        </Fab>
                        <br/>
                        <Fab variant={"extended"}>
                            <Facebook
                            /> Log in with FaceBook
                        </Fab>
                        <br/>
                        <Fab variant={"extended"}>
                            <LocationOff
                            /> Continue as Guest
                        </Fab>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default withRouter(Login)