import React, { useState, useEffect } from 'react'
import ProfileRoute from './ProfileRoute'

const Profile = (props) => {
  const [userRoutes, setUserRoutes] = useState([])

  const getUserRoutes = async () => {
    try{
      const response = await fetch(`/api/v1/routes`)
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setUserRoutes(body.routes)
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }

  useEffect(() => {
    getUserRoutes()
  }, [])

  const showCompleted = () => {
    const completedRoutes = userRoutes.filter((route) => route.ticks > 0)
    setUserRoutes(completedRoutes)
  }

  const userRouteList = userRoutes.map((route, idx) => {
    return <ProfileRoute key={idx} route={route} />
  })
  return (
    <>
      <h1>my profile goes here</h1>
      <h2>My saved routes:</h2>
      <button className="button" onClick={showCompleted}>View Completed Routes</button>
      {userRouteList}
    </>
  )
}

export default Profile