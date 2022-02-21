import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import LandingPage from "./layout/LandingPage";
import IndexPage from "./layout/IndexPage";
import AuthenticatedRoute from './authentication/AuthenticatedRoute'
import Profile from "./layout/Profile";
import NewProfileForm from "./layout/NewProfileForm";
import ClimbingPartners from "./layout/ClimbingPartners";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path='/routes' component={IndexPage}/>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/profile">
            <Profile user={currentUser}/>
        </Route>
        <Route exact path="/climbers">
            <ClimbingPartners />
        </Route>
        <Route exact path="/profile/new">
            <NewProfileForm user={currentUser} setCurrentUser={setCurrentUser}/>
        </Route>
      </Switch>
    </Router>
  );
};

export default hot(App);
