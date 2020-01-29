import React from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core";

// TODO Work on styling success page

function RegisterSuccess() {
    return (
        <div>
            <h1>Almost Done!</h1>
            <p>Check your email for that verification link! Afterwards, you can login!</p>
            <a href={"/login"}>Login Now</a>
        </div>
    )
}

export default RegisterSuccess