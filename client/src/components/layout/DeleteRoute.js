import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
const DeleteRoute = (props) => {

  const deleteRoute = async () => {
    try{
      const response = await fetch(`/api/v1/routes/${props.route.id}`, {
        method: 'DELETE',
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(props.route)
      })
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const deletedRoute = props.routes.find(route => route.id === props.route.id)
      const index = props.routes.indexOf(deletedRoute)
      props.routes.splice(index, 1)
      const newRoutes = [...props.routes]
      props.setRouteList(newRoutes)
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }

  return(
    <FontAwesomeIcon className="delete" icon={faTimes} onClick={deleteRoute}/>
  )
}

export default DeleteRoute