import React, { useState, useEffect } from 'react'
import ProfileRoute from './ProfileRoute'
import { Redirect } from 'react-router'

const Profile = (props) => {
  if(!props.user){
    return <Redirect to='/user-sessions/new' />
  }
  const [userRoutes, setUserRoutes] = useState([])
  const [routeList, setRouteList] = useState([])
  const { name, age, grade, details, location, image, style } = props.user


  const getUserRoutes = async () => {
    try{
      const response = await fetch(`/api/v1/routes/user`)
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
    return <ProfileRoute key={idx} route={route} setRouteList={setRouteList} routes={routeList} />
  })

    return (
      <>
        <div className="profile-details">
          <img className="profile-pic" src={image} alt="profile-picture"></img>
          <h2 className="name">{name}</h2>
          <p><strong>Age: </strong>{age}</p>
          <p><strong>Highest Grade: </strong>{grade}</p>
          <p><strong>Preferred Climbing Style: </strong>{style}</p>
          <p><strong>Primary Location: </strong>{location}</p>
          <p><strong>More About {name}: </strong>{details}</p>
        </div>
        <hr></hr>
        <div className="profile-links">
          <button className="button" onClick={showCompleted}>View Completed Routes</button>
          <button className="button" onClick={showSaved}>Saved Routes</button>
        </div>
        {userRouteList}
      </>
    )
}

export default Profile