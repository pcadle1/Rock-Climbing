import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import RoutePhoto from './RoutePhoto'
const ProfileRoute = (props) => {
  const { route } = props
  return (
    <div className='route-tile'>
      <FontAwesomeIcon icon={faMinus} className="delete-route"/>
      <h1>{route.name}</h1>
      <p>Located At: {route.sector}</p>
      <p>Grade: {route.grade}</p>
      <p>Style: {route.type}</p>
      <RoutePhoto />
    </div>
  )
}

export default ProfileRoute