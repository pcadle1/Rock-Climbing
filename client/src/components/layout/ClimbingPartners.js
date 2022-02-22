import React, { useState, useEffect } from 'react'
import ProfileTile from './ProfileTile'

const ClimbingPartners = (props) => {
  const [partners, setPartners] = useState([])

  const getClimbingPartners = async () => {
    try{
      const response = await fetch('/api/v1/partners')
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setPartners(body.partners.filter(partner => partner.id !== props.user.id))
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }

  useEffect(() => {
    getClimbingPartners()
  }, [])

  const allPartners = partners.map((partner, idx) => {
    return <ProfileTile user={partner} key={partner.id} follow={true}/>
  })

  return (
    <div className="grid-x grid-margin-x">
      {allPartners}
    </div>
  )
}

export default ClimbingPartners