import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProfileTile from './ProfileTile'
import ProfileRoute from './ProfileRoute'
import ChartContainer from './ChartContainer'

const ShowProfile = (props) => {
  const [climber, setClimber] = useState({
    name: '',
    age: '',
    location: '',
    blurb: '',
    style: '',
    grade: '',
    image: {},
    routes: []
  })

  const { id } = useParams()

  const getClimberInfo = async () => {
    try{
      const response = await fetch(`/api/v1/profile/${id}`)
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setClimber(body.climber)
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }

  useEffect(() => {
    getClimberInfo()
  }, [])

  const profileRoutes = climber.routes.map((route) => {
    return <ProfileRoute route={route} buttons={false}/>
  })
  return (
    <>
    <ProfileTile user={climber} follow={false}/>
    <ChartContainer data={climber.routes}/>
    {profileRoutes}
    </>
  )
}

export default ShowProfile