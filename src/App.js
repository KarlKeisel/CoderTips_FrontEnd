import React from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import './App.css';

import NavBar from "./components/NavBar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import RegisterSuccess from "./components/auth/RegisterSuccess";
import MainWindow from "./components/MainWindow";
import Logout from "./components/auth/Logout";
import NotFound from "./components/NotFound";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";

function App() {

    const [auth, setAuth] = React.useState({
        isAuthenticated: false,
        user: null,  // Expects Cognito User Token
    });

    const setAuthStatus = authStatus => {
        setAuth({...auth, isAuthenticated: authStatus})
    };
    
    const setUser = user => {
        setAuth({...auth, user: user})
    };

    const authProps = {  // Wrapping for easy pass down
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        setAuthStatus,
        setUser,
    };

    // TODO Create a redirect from '/main' if not logged in
    return (
        <BrowserRouter>
            <NavBar auth={authProps}/>
            <Switch>
                <Route exact path={"/"} component={LandingPage}/>
                <Route exact path={"/main"} render={(props) => <MainWindow {...props} auth={authProps}/>}/>
                <Route exact path={"/register"} render={(props) => <Register {...props} auth={authProps}/>}/>
                <Route exact path={"/register/success"} component={RegisterSuccess}/>
                <Route exact path={"/login"} render={(props) => <Login {...props} auth={authProps}/>}/>
                <Route exact path={"/logout"} render={(props) => <Logout {...props} auth={authProps}/>}/>
                <Route component={NotFound}/>
            </Switch>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
