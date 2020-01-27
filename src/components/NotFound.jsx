import React from 'react';
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core";
import {Paper, Grid, Container} from "@material-ui/core";

// TODO Finish Not Found Styling

function NotFound() {
    return (
        <Container>
            <Paper>
                <h1>The page you are looking for is not here.</h1>
                <hr/>
                <h2>Perhaps you already logged in, and need to get to your notes, <a href={"/main"}>Click Here</a></h2>
                <h2>If you were trying to login, <a href={"/login"}>Click Here</a></h2>
                <h2>Maybe you needed to make an account, <a href={"/register"}>Click Here</a></h2>
                <h2>Or maybe you wanted to get back to the landing page to see what we are about! <a href={"/"}>Click Here</a></h2>
            </Paper>
        </Container>
    )
}

export default NotFound