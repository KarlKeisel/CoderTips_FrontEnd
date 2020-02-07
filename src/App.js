import React, {useState, useEffect} from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import './App.css';

import {Auth} from 'aws-amplify';

import NavBar from "./components/NavBar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import RegisterSuccess from "./components/auth/RegisterSuccess";
import MainWindow from "./components/MainWindow";
import Logout from "./components/auth/Logout";
import NotFound from "./components/NotFound";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import ChangePassword from "./components/auth/ChangePassword";
import ChangePasswordConfirm from "./components/auth/ChangePasswordConfirm";

function App() {

    const [auth, setAuth] = useState({isAuthenticated: false,});
    const [user, setUser] = useState({user: null});  // Expects an AWS Cognito object
    const [isLoading, setIsLoading] = useState(true);

    const setAuthStatus = authStatus => {
        setAuth({isAuthenticated: authStatus});
    };

    const setUserObject = user => {
        setUser({user: user});
    };

    const authProps = {  // Wrapping for easy pass down
        isAuthenticated: auth.isAuthenticated,
        user: user.user,
        setAuthStatus: setAuthStatus,
        setUser: setUserObject,
    };

    useEffect(() => {  // Check for previous session in local storage
        async function checkLocalStorage() {
            try {
                const session = await Auth.currentSession();
                // console.log(session);
                setAuth({isAuthenticated: true});
                const user = await Auth.currentAuthenticatedUser();
                setUser({user: user})
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        checkLocalStorage();
    }, []);

    // TODO Create a redirect from '/main', '/changepassword' if not logged in
    return (
        !isLoading &&
        <BrowserRouter>
            <NavBar auth={authProps}/>
            <button onClick={() => authProps.setAuthStatus(!auth.isAuthenticated)}>Click</button>
            <button onClick={() => console.log(auth, user)}>Check state</button>
            <Switch>
                <Route exact path={"/"} component={LandingPage}/>
                <Route exact path={"/main"} render={(props) => <MainWindow {...props} auth={authProps}/>}/>
                <Route exact path={"/register"} render={(props) => <Register {...props} auth={authProps}/>}/>
                <Route exact path={"/registersuccess"} component={RegisterSuccess}/>
                <Route exact path={"/login"} render={(props) => <Login {...props} auth={authProps}/>}/>
                <Route exact path={"/logout"} render={(props) => <Logout {...props} auth={authProps}/>}/>
                <Route exact path={"/changepassword"} render={(props) => <ChangePassword {...props} auth={authProps}/>}/>
                <Route exact path={"/changepasswordconfirm"} component={ChangePasswordConfirm}/>
                <Route component={NotFound}/>
            </Switch>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
