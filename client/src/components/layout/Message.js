import React, { useState, useEffect } from 'react'
import SenderTile from './SenderTile'
const Message = (props) => {
  const [messages, setMessages] = useState([])
  const [senders, setSenders] = useState([])
  const [selected, setSelected] = useState(null)
  // const getMessages = async () => {
  //   try{
  //     const response = await fetch(`/api/v1/messages`)
  //     if(!response.ok){
  //       throw new Error(`${response.status} ${response.statusText}`)
  //     }
  //     const body = await response.json()
  //     setMessages(body.messages)
  //   }catch(error){
  //     console.log(`Error in fetch: ${error}`)
  //   }
  // }

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
    return <SenderTile key={idx} sender={sender} setSelected={setSelected} getMessages={getMessages}/>
  })
  const messageList = messages.map((message) => {
    return <p>{message.messageText}</p>
  })
  return (
    <div className="messages-page">
      <h1>Messages</h1>
      <hr></hr>
      <div className="grid-x">
        <div className="cell small-4">
          {senderList}
        </div>
        <div className="cell small-8">
          {messageList}
        </div>
      </div>
    </div>
  )
}

export default Message