import React from 'react'

const ProfileRoute = (props) => {
  const { route } = props
  return (
    <div className='route-tile'>
      <h1>{route.name}</h1>
      <p>Located At: {route.sector}</p>
      <p>Grade: {route.grade}</p>
      <p>Style: {route.type}</p>
    </div>
  )
}

export default ProfileRoute