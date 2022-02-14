import React, { useState, useEffect } from 'react'
import MapContainer from './MapContainer'
import RouteTile from './RouteTile'

const IndexPage = (props) => {
  const [routes, setRoutes] = useState([])
  const [location, setLocation] = useState({
    zipcode: '',
    radius: ''
  })
  
  const getAllRoutes = async (location) => {
    try{
      const response = await fetch(`/api/v1/routes/${location.zipcode}&${location.radius}`)
      if (!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setRoutes(body.routes)
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }

  useEffect(() => {
    getAllRoutes()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    getAllRoutes(location)
  }

  const handleInputChange = (event) => {
    setLocation({...location, 
      [event.currentTarget.name]: event.currentTarget.value})
  }

  const routesList = routes.map((route) => {
    return <RouteTile route={route}/>
  })

  return (
    <>
    <MapContainer routes={routes} location={location.zipcode}/>
    <h1 className='index-header'>Find Routes</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="zipcode">Zipcode</label>
      <input type="text" name="zipcode" id="zipcode" onChange={handleInputChange}></input>
      <label htmlFor="radius">Radius</label>
      <input type="text" name="radius" id="radius" onChange={handleInputChange}></input>
      <input type="submit"></input>
    </form>
      <div className='routes'>
        {routesList}
      </div>
    </>
  )
}

export default IndexPage