import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

const ProfileRoute = (props) => {
  const { route } = props

  const deleteRoute = () => {
    
  }

  return (
    <div className='route-tile'>
      <FontAwesomeIcon icon={faMinus} onClick ={ deleteRoute } className="delete-route"/>
      <h1>{route.name}</h1>
      <p>Located At: {route.sector}</p>
      <p>Grade: {route.grade}</p>
      <p>Style: {route.type}</p>
    </div>
  )
}

export default ProfileRoute