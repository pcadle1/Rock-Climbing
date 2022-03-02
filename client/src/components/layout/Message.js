import React, { useState, useEffect } from 'react'

const Message = (props) => {
  const [messages, setMessages] = useState([])
  const getMessages = async () => {
    try{
      const response = await fetch(`/api/v1/messages`)
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
    getMessages()
  }, [])

  return (
    <h1>message</h1>
  )
}

export default Message