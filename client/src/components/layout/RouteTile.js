import React from 'react'

const RouteTile = (props) => {
  const { route } = props
  const type = Object.keys(route.type)[0]
  return (
    <div className='route-tile'>
      <h1>{route.name}</h1>
      <p>{route.yds}, {type}</p>
    </div>
  )
}

export default RouteTile

