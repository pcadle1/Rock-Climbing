import React, { useState, useEffect } from 'react'
import ProfileRoute from './ProfileRoute'
import { Redirect } from 'react-router'
import ProfileTile from './ProfileTile'

const Profile = (props) => {
  const [userRoutes, setUserRoutes] = useState([])
  const [display, setDisplay] = useState({
    completed: false,
    saved: true,
    following: false
  })
  const [following, setFollowing] = useState([])
  const { name, age, grade, details, location, image, style } = props.user
  
  const getUserRoutes = async () => {
    try{
      const response = await fetch(`/api/v1/routes/user`)
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
    getFollowing()
  }, [])

  
  const showCompleted = () => {
    setDisplay({saved: false, completed: true, following: false})
  }
  const showSaved = () => {
    setDisplay({saved: true, completed: false, following: false})
  }

  const showFollowing = () => {
    setDisplay({saved: false, completed: false, following: true})
  }

  const getFollowing = async () => {
    try{
      const response = await fetch('/api/v1/partners/following')
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setFollowing(body.following)
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }
  
  let displayList
  if(display.saved){
    displayList = userRoutes.map((route, idx) => {
      return <ProfileRoute key={idx} route={route} setUserRoutes={setUserRoutes} routes={userRoutes} buttons={true}/>
    })
  }else if (display.completed){
    const completedRoutes = userRoutes.filter((route) => route.details.ticks > 0)
    displayList = completedRoutes.map((route, idx) => {
      return <ProfileRoute key={idx} route={route} setUserRoutes={setUserRoutes} routes={userRoutes} buttons={true}/>
    })
  }else if (display.following){
    displayList = following.map((climber) => {
      return <ProfileTile user={climber} key={climber.id} follow={false}/>
    })
  }

    return (
      <div>
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
          <button className="button" onClick={showFollowing}>Following</button>
        </div>
        <div className="grid-x grid margin-x">
          {displayList}
        </div>
      </div>
    )
}

export default Profile