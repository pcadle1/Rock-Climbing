import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
const LandingPage = (props) => {
  const [searchLocation, setSearchLocation] = useState({
    zipcode: '',
    radius: 25
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const handleChange = (event) => {
    setSearchLocation({...searchLocation, zipcode: event.currentTarget.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setShouldRedirect(true)
  }

  if(shouldRedirect){
    return <Redirect to={{
      pathname: "/routes",
      state: { searchLocation }
    }} />
  }
  return (
    <div className="landing-page">
      <h1 className='landing-header'>Find Routes, Partners, and Share Your Adventures</h1>
      <div className="start-button">
        <Link to="/users/new" className="start">
          Sign Up
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="zip">Find Climbs Near You!</label>
        <input type="text" id="zip" name="zip" placeholder="ZipCode" onChange={handleChange} value={searchLocation.zipcode}></input>
        <input type="submit"></input>
      </form>

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