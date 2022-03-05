import React, { useState, useEffect } from 'react'
import SenderTile from './SenderTile'
import MessageTile from './MessageTile'
import MessageForm from './MessageForm'

const Message = (props) => {
  const [messages, setMessages] = useState([])
  const [senders, setSenders] = useState([])
  const [selected, setSelected] = useState(null)

  const getMessageSenders = async () => {
    try{
      const response = await fetch(`/api/v1/messages/senders`)
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setSenders(body.senders)
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }

  const getMessages = async (id) => {
    try{
      const response = await fetch(`/api/v1/messages/?id=${id}`)
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setMessages(body.messages)
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }

  useEffect(() => {
    getMessageSenders()
  }, [])
  
  const senderList = senders.map((sender, idx) => {
    return <SenderTile key={idx} sender={sender} getMessages={getMessages} selected={selected} setSelected={setSelected}/>
  })
  const messageList = messages.map((message, idx) => {
    return <MessageTile key={idx} message={message} selected={selected} user={props.user}/>
  })
  return (
    <div className="messages-page">
      <h1>Messages</h1>
      <hr></hr>
      <div className="grid-x">
        <div className="cell small-12 medium-4">
          {senderList}
        </div>
        {selected ? 
        <div className="messages cell small-12 medium-8">
          {messageList}
          <MessageForm recipient={selected} messages={messages} setMessages={setMessages}/>
        </div> : '' }
      </div>
    </div>
  )
}

export default Message