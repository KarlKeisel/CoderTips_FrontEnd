import React from 'react';
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core";
import {Paper, Grid, Container, Fab, FormControl, TextField, InputLabel, OutlinedInput} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import {withRouter} from "react-router-dom"

import {Auth} from "aws-amplify";

import FormErrors from "../FormErrors";
import {isSecureFull, isEmailProper} from "./helpers/formFunctions";
import PasswordRequirements from "./helpers/PasswordRequirements";


// TODO Finish Register Styling

const useStyles = makeStyles(theme => ({
    textField: {
        width: 500,
    },
    margin: {
        margin: theme.spacing(1),
    },
    formBox: {
        alignContent: "center",
        textJustify: "center",
    },
}));

function Register(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        showPassword: false,
        securePassword: false,
        errors: {
            cognito: null,
        },
    });

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    };

    const clearErrorState = () => {
        setValues({...values, errors: {cognito: null}})
    };

    const handleSubmit = async event => {
        event.preventDefault();

        clearErrorState();
        const {username, email, password} = values;
        try {
            const signUpResponse = await Auth.signUp({
                username,
                password,
                attributes: {
                    email: email
                }
            });
            props.history.push("/register/success")
        } catch (error) {  // Sometimes returned as error, or error.message
            let err = null;
            !error.message ? err = {"message": error} : err = error;  // Normalize
            setValues({
                ...values, errors: {cognito: err}
            });
        }
    };

    const isSecure = () => {
        const {password, password2, username, email} = values;
        return isSecureFull(password, password2, username, email)
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const validEmail = () => {
        return values.email.length > 0 && !isEmailProper(values.email)
    };

    return (
        <Container fixed>
            <Paper className={classes.formBox}>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <h3>Register Now:</h3>
                        <FormErrors formerrors={values.errors}/>
                        <TextField
                            label="User Name"
                            id="username"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                            onChange={handleChange('username')}
                        />
                        <br/>
                        <TextField
                            label="Email"
                            id="email"
                            className={clsx(classes.margin, classes.textField)}
                            variant={"outlined"}
                            onChange={handleChange('email')}
                            error={validEmail()}
                            helperText={validEmail() ? "Enter a valid email" : null}
                        />
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel>Enter Password</InputLabel>
                            <OutlinedInput
                                labelWidth={115}
                                id="password"
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
                            />
                        </FormControl>
                        <br/>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel>Reenter Password</InputLabel>
                            <OutlinedInput
                                labelWidth={130}
                                id="password2"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password2}
                                onChange={handleChange('password2')}
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
                            />
                        </FormControl>
                        <br/>
                        <Fab variant={"extended"} disabled={!isSecure()} onClick={handleSubmit}>
                            Register
                        </Fab>
                    </Grid>
                    <Grid item md={6}>
                        <PasswordRequirements password={values.password} password2={values.password2}/>
                        <br/>
                        <h4>You are {isSecure() ? "Ready!" : "Not Ready!"}</h4>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default withRouter(Register);