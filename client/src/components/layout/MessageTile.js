import React from 'react'

const MessageTile = (props) => {
  const date = new Date(props.message.createdAt)
  const dateString = date.toLocaleDateString()
  let sent = ''
  let left = ''
  if(props.selected === props.message.senderId){
    sent = 'sent'
    left = 'left'
  }

  return(
    <div className={`${left} text-box`}>
      <div className={`${sent} message-box`}>
          <p>{props.message.messageText}</p>
          <p>{dateString}</p>
      </div>
    </div>
  )
}

export default MessageTile