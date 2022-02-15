import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const RouteTile = (props) => {
  const { route } = props
  const type = Object.keys(route.type)[0]
  return (
    <div className='route-tile'>
      <FontAwesomeIcon icon={faPlus} />
      <h1>{route.name}</h1>
      <p>Located At: {route.meta_parent_sector}</p>
      <p>Grade: {route.yds}</p>
      <p>Style: {type}</p>
    </div>
  )
}

export default RouteTile

