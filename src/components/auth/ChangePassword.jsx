import React, {useState} from "react";

import clsx from 'clsx';
import {InputAdornment, InputLabel, makeStyles, OutlinedInput, FormControl} from "@material-ui/core";
import {Container, Paper, IconButton, Grid} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import PasswordRequirements from "./helpers/PasswordRequirements";
import {isPasswordSecure} from "./helpers/formFunctions";


// TODO Change Password Styling
// TODO Submit Function

const useStyles = makeStyles(theme => ({
    textField: {
        width: 500,
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function ChangePassword() {
    const classes = useStyles();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errors, setErrors] = useState({
        errors: {
            cognito: null,
        }
    });

    const clearErrorState = () => {
        setErrors({...errors, errors: {cognito: null}})
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleChange = prop => event => {
        console.log(event.target.id)
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleSubmit = async event => {
        event.preventDefault();

        clearErrorState();
        // TODO Try / Catch Logic here
    };

    return (
        <Container>
            <Paper>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <h3>Change Password</h3>
                        <p>Don't like your old password? Lets change it up!</p>
                        <br/>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant={"outlined"}>
                            <InputLabel>Enter Current Password</InputLabel>
                            <OutlinedInput
                                labelWidth={170}
                                id={"oldPassword"}
                                type={showPassword ? 'text' : 'password'}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position={"end"}>
                                        <IconButton
                                            aria-label={"toggle password visibility"}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge={"end"}
                                        >
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant={"outlined"}>
                            <InputLabel>Enter New Password</InputLabel>
                            <OutlinedInput
                                labelWidth={150}
                                id={"newPassword"}
                                type={showPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position={"end"}>
                                        <IconButton
                                            aria-label={"toggle password visibility"}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge={"end"}
                                        >
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant={"outlined"}>
                            <InputLabel>Reenter New Password</InputLabel>
                            <OutlinedInput
                                labelWidth={170}
                                id={"confirmNewPassword"}
                                type={showPassword ? 'text' : 'password'}
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position={"end"}>
                                        <IconButton
                                            aria-label={"toggle password visibility"}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge={"end"}
                                        >
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={6}>
                        <PasswordRequirements password={newPassword} password2={confirmNewPassword}/>
                        <br/>
                        <h4>You are {isPasswordSecure(newPassword, confirmNewPassword) ? "Ready!" : "Not Ready!"}</h4>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
)
}