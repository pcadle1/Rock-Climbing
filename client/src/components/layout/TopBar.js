import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="profile">
      <Link to='/profile'>My Profile</Link>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar navbar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text title">Climb Buddy</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to='/routes'>
              Find Routes
            </Link>
          </li>
          <li>
            <Link to='/climbers'>
              Find Climbing Partners
            </Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right navbar">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
