import React, { useState } from 'react'

const TickButton = (props) => {
  return (
    <div>
      <button onClick={props.markCompleted} className="button">Add a Tick!</button>
    </div>
  )
}

export default TickButton