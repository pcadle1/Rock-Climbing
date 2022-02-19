import React, { useState } from 'react'
import EditRoute from './EditRoute'
import DeleteRoute from './DeleteRoute'
import TickButton from './TickButton'
const ProfileRoute = (props) => {
  const { route } = props
  let img = ''
  if(route.details.image !== null){
    img = <img className="review-image" src={route.details.image}/>
  }
  const markCompleted = async (event) => {
    event.preventDefault()
    let numTicks = props.route.details.ticks + 1
    try{
      const response = await fetch(`/api/v1/routes/${props.route.id}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ numTicks })
      })
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      const replacedRoute = props.routes.find(route => route.id === body.route.id)
      const index = props.routes.indexOf(replacedRoute)
      props.routes.splice(index, 1, body.route)
      const newRoutes = [...props.routes]
      props.setUserRoutes(newRoutes)
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }

  return (
    <div className='route-tile'>
      <DeleteRoute route={route} setUserRoutes={props.setUserRoutes} routes={props.routes}/>
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
      <EditRoute route={route} setUserRoutes={props.setUserRoutes} routes={props.routes}/>
      <TickButton route={route} markCompleted={markCompleted}/>
    </div>
  )
}

export default ProfileRoute