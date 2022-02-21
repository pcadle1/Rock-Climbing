import React from 'react'

const ProfileTile = (props) => {
  const { user } = props

  const addPartner = async (event) => {
    event.preventDefault()
    try{
      const response = await fetch(`/api/v1/partners`, {
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

  return (
    <div className="cell-small 4 user-tile">
          <img className="profile-pic" src={user.image} alt="profile-picture"></img>
          <h2 className="name">{user.name}</h2>
          <p><strong>Age: </strong>{user.age}</p>
          <p><strong>Highest Grade: </strong>{user.grade}</p>
          <p><strong>Preferred Climbing Style: </strong>{user.style}</p>
          <p><strong>Primary Location: </strong>{user.location}</p>
          <p><strong>More About {name}: </strong>{user.details}</p>
          <button className="button add-friend" onClick={addPartner}>Add Friend</button>
      </div>
  )
}

export default ProfileTile