import React, {useState} from 'react';

import clsx from 'clsx';
import {
    Container,
    makeStyles,
    Paper,
    Grid,
    TextField,
    InputLabel,
    OutlinedInput,
    FormControl,
    InputAdornment,
    IconButton,
    Fab,
} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";

import PasswordRequirements from "./helpers/PasswordRequirements";
import {isPasswordSecure} from "./helpers/formFunctions";
import ModalQuickText from "./helpers/ModalQuickText";
import FormErrors from "../FormErrors";

import {withRouter} from "react-router-dom";

import {Auth} from "aws-amplify";

// TODO Finish Page

const useStyles = makeStyles(theme => ({
    textField: {
        width: 500,
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

function ForgotPasswordVerification(props) {
    const classes = useStyles();
    const [values, setValues] = useState({
        username: '',
        code: '',
        newPassword: '',
        showPassword: false,
        errors: {
            cognito: null,
        },
    });
    // Modal functions and info
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(!open)
    };
    const modalInfo = {
        title: "Your New Password is Ready!",
        text: "Redirecting you to the login page now.",
        buttonText: "Login!",
        open: open,
        redirect: "/login",
        handleClose: handleClose,
    };

    // Modal end

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value})
    };

    const clearErrorState = () => {
        setValues({
            ...values, errors: {cognito: null}
        })
    };

    function enableSubmitButton() {  // TODO Fix Layout to not need double passwords
        return (
            isPasswordSecure(values.newPassword, values.newPassword)
            && values.username.length > 3
            && values.code.length > 3
        )
    }

    const handleSubmit = async event => {
        event.preventDefault();
        clearErrorState();

        Auth.forgotPasswordSubmit(values.username, values.code, values.newPassword)
            .then(data => {
                handleClose();
            })
            .catch(error => {
                let err = null;
                !error.message ? err = {"message": error} : err = error; // Normalize
                setValues({
                    ...values, errors: {cognito: err}
                });
            })
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <Container fixed>
            <ModalQuickText modal={modalInfo} />
            <Paper>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <h3>Enter New Password</h3>
                        <FormErrors formerrors={values.errors}/>
                        <TextField
                            label="Verification Code"
                            id={"outlined-code"}
                            className={clsx(classes.margin, classes.textField)}
                            variant={"outlined"}
                            value={values.code}
                            onChange={handleChange('code')}
                        />
                        <TextField
                            label={"User Name"}
                            id={"outlined-username"}
                            className={clsx(classes.margin, classes.textField)}
                            variant={"outlined"}
                            value={values.username}
                            onChange={handleChange('username')}
                        />
                        <FormControl
                            className={clsx(classes.margin, classes.textField)}
                            variant={"outlined"}
                        >
                            <InputLabel>New Password</InputLabel>
                            <OutlinedInput
                                id={"outlined-adornment-password"}
                                type={values.showPassword ? 'text' : 'password'}
                                values={values.newPassword}
                                onChange={handleChange('newPassword')}
                                labelWidth={110}
                                endAdornment={
                                    <InputAdornment position={"end"}>
                                        <IconButton
                                            aria-label={"toggle password visibility"}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge={"end"}
                                        >
                                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Fab
                            variant={"extended"}
                            disabled={!enableSubmitButton()}
                            // Same to bypass password matching
                            onClick={handleSubmit}
                        >
                            Change Password
                        </Fab>
                    </Grid>
                    <Grid item md={6}>
                        <PasswordRequirements password={values.newPassword} password2={values.newPassword}/>
                        <br/>
                        <h4>You are {isPasswordSecure(values.newPassword, values.newPassword) ? "Ready!" : "not Ready!"}</h4>
                        {/*TODO Fix layout to not need double passwords*/}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default withRouter(ForgotPasswordVerification)