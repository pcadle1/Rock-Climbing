import React, { useState, useEffect } from 'react'
import ProfileTile from './ProfileTile'

const ClimbingPartners = (props) => {
  const [partners, setPartners] = useState([])
  const [searchData, setSearchData] = useState('')
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

  const handleChange = (event) => {
    event.preventDefault()
    setSearchData(event.currentTarget.value)
  }
  const searchedPartners = partners.filter(partner => partner.location.toLowerCase().includes(searchData.toLowerCase()))

  const allPartners = searchedPartners.map((partner) => {
    return <ProfileTile user={partner} key={partner.id} follow={true}/>
  })


  return (
    <div>
      <form className="partner-search">
        <label htmlFor="location">Search By Location For Climbing Partners</label>
        <input type="text" name="location" value={searchData} onChange={handleChange} placeholder="Enter Location"></input>
      </form>
        <hr></hr>
      <div className="partners grid-x grid-margin-x">
        {allPartners}
      </div>
    </div>
  )
}

export default ClimbingPartners