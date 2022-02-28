import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
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
      <h1 className='landing-header'>Climb Buddy</h1>
      <div className="description">
        <p>A Community to Find Places to Climb and People to Climb With!</p>
        <p>Get Started by Finding Some Routes</p>
      </div>
      <FontAwesomeIcon className='arrow' icon={faArrowDown} />
      <form className='route-search' onSubmit={handleSubmit}>
        <input className='zip' type="text" id="zip" name="zip" placeholder="ZipCode" onChange={handleChange} value={searchLocation.zipcode}></input>
        <input className="start-button"type="submit"></input>
      </form>
      </div>
  )
}

export default LandingPage