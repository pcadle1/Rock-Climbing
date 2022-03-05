import React, { useState } from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'

const NewConversation = (props) => {
  const [selected, setSelected] = useState({})

  const getSearch = async (name) => {
    try{
      const response = await fetch(`/api/v1/partners?name=${name}`)
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      const options = body.partners.map((result) => {
        return {label: result.name, value: result}
      })
      return options
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }

  const addNewConversation = async (partner) => {
    try{
      const response = await fetch(`/api/v1/messages`, {
        method: "POST",
        headers: new headers({
          "Content-type": "application/json"
        }),
        body: JSON.stringify({ recipient: partner, message: 'Hey! Let\'s chat!'})
      })
      if(!response.ok){
        if(response.status === 422){
          const body = await response.json()
        }
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      debugger
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }

  const handleInputChange = (event) => {
    const newConversation = {id: event.value.id, name: event.value.name, image: event.value.image}
    let unique = [...new Map(props.senders.concat(newConversation).map((sender) => [sender["id"], sender])).values()]
    props.setSenders(unique)
  }
  return (
      <AsyncSelect loadOptions={getSearch} onChange={handleInputChange}/>
  )
}

export default NewConversation