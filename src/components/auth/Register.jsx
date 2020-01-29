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
    secure: {
        color: "green"
    },
    notSecure: {
        color: "black"
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

        // Form Validation
        clearErrorState();
        // AWS Cognito Submit Here
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
        if (password.length > 7
            && password.match(/[0-9]+/) != null
            && password.match(/[$&+,:;=?@#|'<>.\-^*()%!]/) != null
            && password.match(/[A-Z]/) != null
            && password.match(/[a-z]/) != null
            && password === password2
            && username.length > 2
            && email.match(/([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})/) != null
        ) {
            return true
        } else {
            return false
        }
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const validEmail = () => {
        return values.email.length > 0 && values.email.match(/([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})/) == null
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
                                labelWidth={70}
                            />
                        </FormControl>
                        <br/>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel>Reenter Password</InputLabel>
                            <OutlinedInput
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
                                labelWidth={70}
                            />
                        </FormControl>
                        <br/>
                        <Fab variant={"extended"} disabled={!isSecure()} onClick={handleSubmit}>
                            Register
                        </Fab>
                    </Grid>
                    <Grid item md={6}>
                        <h3>Secure Passwords Are:</h3>
                        <p className={values.password.length > 7 ? classes.secure : classes.notSecure}>
                            Minimum of 8 characters
                        </p>
                        <p className={values.password.match(/[0-9]+/) != null ? classes.secure : classes.notSecure}>
                            Have at least one number
                        </p>
                        <p className={values.password.match(/[$&+,:;=?@#|'<>.\-^*()%!]/) != null ? classes.secure : classes.notSecure}>
                            Have at least one special character like ! $ % ( ) *
                        </p>
                        <p className={values.password.match(/[A-Z]/) != null ? classes.secure : classes.notSecure}>
                            Have at least one CAPITAL letter
                        </p>
                        <p className={values.password.match(/[a-z]/) != null ? classes.secure : classes.notSecure}>
                            Have at least one lowercase letter
                        </p>
                        <p className={values.password === values.password2 && values.password.length > 7 ? classes.secure : classes.notSecure}>
                            Your passwords must match
                        </p>
                        <br/>
                        <h4>You are {isSecure() ? "Ready!" : "Not Ready!"}</h4>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default withRouter(Register);