import React, { useState, useEffect } from 'react'
import ProfileRoute from './ProfileRoute'

const Profile = (props) => {
  const [userRoutes, setUserRoutes] = useState([])
  const [routeList, setRouteList] = useState([])
  const getUserRoutes = async () => {
    try{
      const response = await fetch(`/api/v1/routes`)
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setUserRoutes(body.routes)
      setRouteList(body.routes)
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }

  useEffect(() => {
    getUserRoutes()
  }, [])

  
  let userRouteList
  
  const showCompleted = () => {
    const completedRoutes = userRoutes.filter((route) => route.ticks > 0)
    setRouteList(completedRoutes)
  }
  const showSaved = () => {
    setRouteList(userRoutes)
  }
  userRouteList = routeList.map((route, idx) => {
    return <ProfileRoute key={idx} route={route} />
  })

  return (
    <>
      <h1>my profile goes here</h1>
      <h2>My saved routes:</h2>
      <button className="button" onClick={showCompleted}>View Completed Routes</button>
      <button className="button" onClick={showSaved}>Saved Routes</button>
      {userRouteList}
    </>
  )
}

export default Profile