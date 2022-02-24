import React, { useState, useEffect } from 'react'
import MapContainer from './MapContainer'
import RouteTile from './RouteTile'
import ChartContainer from './ChartContainer'

const IndexPage = (props) => {
  const [routes, setRoutes] = useState([])
  const [location, setLocation] = useState({
    zipcode: '03038',
    radius: 0
  })
  const [selectedArea, setSelectedArea] = useState()

  const handleSelect = (route) => {
    setSelectedArea({lat: route.lat, lng: route.lng})
  }

  const getAllRoutes = async (location) => {
    try{
      const response = await fetch(`/api/v1/routes/?zip=${location.zipcode}&radius=${location.radius}`)
      if (!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setRoutes(body.routes)
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }
  
  useEffect( () => {
    if(props.location.state){
      getAllRoutes(props.location.state.searchLocation)
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    getAllRoutes(location)
  }

  const handleInputChange = (event) => {
    setLocation({...location, 
      [event.currentTarget.name]: event.currentTarget.value})
  }

  let routesList
  let chart = null
  if(selectedArea){
    const selectedAreaRoutes = routes.filter((route) => route.lat === selectedArea.lat)
    routesList = selectedAreaRoutes.map((route, idx) => {
      return <RouteTile key ={idx} route={route} />
    })
    chart = <ChartContainer data={selectedAreaRoutes}/>
  }else{
    routesList = routes.map((route, idx) => {
      return <RouteTile key={idx} route={route}/>
    })
    chart = <ChartContainer data={routes} />
  }


  return (
    <>
    <h1 className='index-header'>Find Routes</h1>
    <div className="form-and-doughnut">
      <form className = "route-submit-form" onSubmit={handleSubmit}>
        <label htmlFor="zipcode">Zipcode</label>
        <input type="text" name="zipcode" id="zipcode" onChange={handleInputChange}></input>
        <label htmlFor="radius">Radius(km)</label>
        <input type="text" name="radius" id="radius" onChange={handleInputChange}></input>
        <input className="button" type="submit"></input>
      </form>
      { chart }
    </div>
    <div className="grid-x grid-margin-x map-info">
      <div className="cell small-6 map-div">
        <MapContainer handleSelect={handleSelect} selectedArea={selectedArea} routes={routes} location={location.zipcode}/>
      </div>
      <div className='cell small-6 routes'>
        {routesList}
      </div>
    </div>
    </>
  )
}

export default IndexPage