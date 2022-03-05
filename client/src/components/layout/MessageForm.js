import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

const MessageForm = (props) => {
  const [message, setMessage] = useState('')

  const postMessage = async (message) => {
    try{
      const response = await fetch(`/api/v1/messages`, {
        method: 'POST',
        headers: new Headers ({
          "Content-type": "application/json"
        }),
        body: JSON.stringify({ message: message, recipient: props.recipient })
      })
      if(!response.ok){
        if(response.status === 422){
          const body = await response.json()
        }
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      props.setMessages([...props.messages, body.message])
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }


  const handleInputChange = (event) => {
    setMessage(event.currentTarget.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postMessage(message)
    setMessage('')
  }

  return(
    <form onSubmit={handleSubmit} className="message-form">
      <input className="message" type="textArea" name="message" value={message} onChange={handleInputChange}></input>
      <FontAwesomeIcon icon={faPaperPlane} onClick={handleSubmit} className="submit-message"/>
    </form>
  )
}

export default MessageForm