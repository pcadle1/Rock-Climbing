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
          tile one
        </div>
        <div className="tile">
          tile two
        </div>
        <div className="tile">
          tile three
        </div>
      </div>
    </div>
  )
}

export default LandingPage