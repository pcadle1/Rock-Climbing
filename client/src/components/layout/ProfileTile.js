import React from 'react'
import { Link } from 'react-router-dom'
const ProfileTile = (props) => {
  const { user, follow } = props
  const addPartner = async (event) => {
    event.preventDefault()
    try{
      const response = await fetch(`/api/v1/partners/${user.id}`, {
        method: 'POST',
        headers: new Headers({
          "Content-type": "application/json"
        }),
        body: JSON.stringify(user)
      })
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }

  let followButton = ''
  if(follow){
    followButton = <button className="button add-follow" onClick={addPartner}>Follow</button>
  }
  return (
    <div className="cell-small 4 user-tile">
          <img className="profile-pic" src={user.image} alt="profile-picture"></img>
          <Link to={`/profile/${user.id}`}>
            <h2 className="name">{user.name}</h2>
          </Link>
          <p><strong>Age: </strong>{user.age}</p>
          <p><strong>Highest Grade: </strong>{user.grade}</p>
          <p><strong>Preferred Climbing Style: </strong>{user.style}</p>
          <p><strong>Primary Location: </strong>{user.location}</p>
          <p><strong>More About {name}: </strong>{user.details}</p>
          {followButton}
      </div>
  )
}

export default ProfileTile