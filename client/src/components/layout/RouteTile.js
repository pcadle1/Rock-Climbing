import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RouteTile = (props) => {
  const { route } = props
  const type = Object.keys(route.type)[0]
  const saveRoute = async () => {
    try{
      const response = await fetch(`/api/v1/routes`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(route)
      })
      if (!response.ok) {
        if(response.status === 422) {
          const body = await response.json()
          alert(body.message)
        }
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }

  return (
    <div className='route-tile'>
      <div className='route-tile-header'>
        <button onClick={saveRoute} className="button">Save Route</button>
        <h1>{route.name}</h1>
      </div>
      <p><strong>Located At:</strong> {route.meta_parent_sector}</p>
      <p><strong>Grade:</strong> {route.yds}</p>
      <p><strong>Style:</strong> {type}</p>
    </div>
  )
}

export default RouteTile

