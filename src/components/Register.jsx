import React from 'react';
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core";
import {Paper, Grid, Container, Fab, FormControl, TextField, InputLabel, OutlinedInput} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

// TODO Finish Register Submit Code
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

function Register() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        username: '',
        password1: '',
        password2: '',
        showPassword: false,
        securePassword: false,
    });

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    };

    const isSecure = () => {
        const {password1, password2, username} = values;
        if (password1.length > 7
            && password1.match(/[0-9]+/) != null
            && password1.match(/[$&+,:;=?@#|'<>.\-^*()%!]/) != null
            && password1.match(/[A-Z]/) != null
            && password1.match(/[a-z]/) != null
            && password1 === password2
            && username.length > 2
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

    return (
        <Container fixed>
            <Paper className={classes.formBox}>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <h3>Register Now:</h3>
                        <TextField
                            label="User Name"
                            id="username"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                            onChange={handleChange('username')}
                        />
                        <br/>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel>Enter Password</InputLabel>
                            <OutlinedInput
                                id="password1"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password1')}
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
                                value={values.password}
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
                        <Fab variant={"extended"} disabled={!isSecure()}>
                            Register
                        </Fab>
                    </Grid>
                    <Grid item md={6}>
                        <h3>Secure Passwords Are:</h3>
                        <p className={values.password1.length > 7 ? classes.secure : classes.notSecure}>
                            Minimum of 8 characters
                        </p>
                        <p className={values.password1.match(/[0-9]+/) != null ? classes.secure : classes.notSecure}>
                            Have at least one number
                        </p>
                        <p className={values.password1.match(/[$&+,:;=?@#|'<>.\-^*()%!]/) != null ? classes.secure : classes.notSecure}>
                            Have at least one special character like ! $ % ( ) *
                        </p>
                        <p className={values.password1.match(/[A-Z]/) != null ? classes.secure : classes.notSecure}>
                            Have at least one CAPITAL letter
                        </p>
                        <p className={values.password1.match(/[a-z]/) != null ? classes.secure : classes.notSecure}>
                            Have at least one lowercase letter
                        </p>
                        <p className={values.password1 === values.password2 && values.password1.length > 7 ? classes.secure : classes.notSecure}>
                            Your passwords must match
                        </p>
                        <br/>
                        <h4>Your password is {isSecure() ? "Secure!" : "Not Secure!"}</h4>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Register