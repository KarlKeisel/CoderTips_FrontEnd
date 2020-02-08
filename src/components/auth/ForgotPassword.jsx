import React, {useState} from 'react';

import clsx from 'clsx';

import {Container, makeStyles, Paper, Grid, TextField, Fab} from "@material-ui/core";

import FormErrors from "../FormErrors";

import {withRouter} from 'react-router-dom';

import {Auth} from 'aws-amplify';
import {isEmailProper} from "./helpers/formFunctions";

// TODO Finish Forgot Password Page

const useStyles = makeStyles(theme => ({
    textField: {
        width: 500,
    },
    marigin: {
        margin: theme.spacing(1),
    },
}));

function ForgotPassword(props) {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({
        errors: {
            cognito: null,
        }
    });

    const clearErrorState = () => {
        setErrors({...errors, errors: {cognito: null}})
    };

    const handleSubmit = async event => {
        event.preventDefault();
        clearErrorState();

        try {
            await Auth.forgotPassword(email);
            props.history.push("/forgotpasswordverification")
        } catch (error) {
            let err = null;
            !error.message ? err = {"message": error} : err = error; // Normalize
            setErrors({
                ...errors, errors: {cognito: err}
            })
        }
    };

    return (
        <Container>
            <Paper>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <h3>Forgot Password?</h3>
                        {errors.errors.cognito === null
                            ? <p>Enter the email associated with your account and we'll send you a reset link.</p>
                            : <FormErrors formerrors={errors.errors}/>
                        }
                        <br/>
                        <TextField
                            label={"Email"}
                            id={"outlined-email"}
                            className={clsx(classes.margin, classes.textField)}
                            variant={"outlined"}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <Fab
                            variant={"extended"}
                            disabled={!isEmailProper(email)}
                            onClick={handleSubmit}
                        >
                            Send Email
                        </Fab>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default withRouter(ForgotPassword)