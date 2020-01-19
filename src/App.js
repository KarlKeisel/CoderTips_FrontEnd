import React from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import './App.css';

import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import MainWindow from "./components/MainWindow";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path={"/"} component={MainWindow} />
        <Route exact path={"/register"} component={Register}/>
        <Route exact path={"/login"} component={Login}/>
        <Route exact path={"/logout"} comonent={Logout}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
