import React from 'react'
import { Link } from 'react-router-dom'
const LandingPage = (props) => {
  return (
    <div className="landing-page">
      <h1 className='landing-header'>Find Routes, Partners, and Share Your Adventures</h1>
      <div className="start-button">
        <Link to="/users/new" className="start">
          Sign Up
        </Link>
      </div>
      <div className="tiles">
        <div className="tile">
          <Link to="/routes">Find Climbing Destinations!</Link>
        </div>
        <div className="tile">
          Connect with Other Climbers!
        </div>
        <div className="tile">
          Track Your progress!
          <Link to="/profile">View Your Profile</Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage