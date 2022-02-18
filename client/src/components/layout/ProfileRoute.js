import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import EditRoute from './EditRoute'
const ProfileRoute = (props) => {
  const { route } = props
  let img = ''
  if(route.details.image !== null){
    img = <img className="review-image" src={route.details.image}/>
  }
  return (
    <div className='route-tile'>
      <FontAwesomeIcon icon={faMinus} className="delete-route"/>
      <h1>{route.name}</h1>
      <div className="tile-container">

      <div className = "review-notes">
        <p><strong>Located At:</strong> {route.sector}</p>
        <p><strong>Grade:</strong> {route.grade}</p>
        <p><strong>Style:</strong> {route.type}</p>
        <p><strong>Notes:</strong> {route.details.review}</p>
        <p><strong>Ticks:</strong> {route.details.ticks}</p>
        <p><strong>Rating:</strong> {route.details.rating} / 5</p>
      </div>
      <div className="edit-image">
          {img}
      </div>
      </div>
      <EditRoute route={route} setRouteList={props.setRouteList} routes={props.routes}/>
    </div>
  )
}

export default ProfileRoute