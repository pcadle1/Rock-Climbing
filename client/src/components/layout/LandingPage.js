import React from 'react'
import { Link } from 'react-router-dom'
const LandingPage = (props) => {
  return (
    <div className="landing-page">
      <h1>Find Routes, Partners, and Share Your Adventures</h1>
      <div className="start-button">
        <Link to="/users/new" className="start">
          Sign Up
        </Link>
      </div>
      <div className="tiles">
        <div className="tile">
          Find climbing destinations!
        </div>
        <div className="tile">
          Connect with Other Climbers!
        </div>
        <div className="tile">
          Track Your progress!
        </div>
      </div>
    </div>
  )
}

export default LandingPage