import React from 'react'

const SenderTile = (props) => {
  const { id, name, image } = props.sender
  const handleClick = () => {
    props.getMessages(id)
    props.setSelected(id)
  }

  let selected = ''
  if(props.selected === id){
    selected = 'selected'
  }

  return (
    <div className={`${selected} sender-tile`} onClick={handleClick}>
      <img src={image} alt="profile photo"/>
      <p>{name}</p>
    </div>
  )
}

export default SenderTile