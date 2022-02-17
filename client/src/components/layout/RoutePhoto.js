import React, { useState, useCallback } from 'react'
import Dropzone from './Dropzone'
const RoutePhoto = (props) => {
  const [photo, setPhoto] = useState({
    image: {}
  })
  const [clicked, setClicked] = useState(null)

  const onDrop = useCallback(acceptedFiles => {
    setPhoto({...photo, image: Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])})})
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    setClicked(!clicked)
  }

  const savePhoto = async (event) => {
      event.preventDefault()
      const newBody = new FormData()
      newBody.append('photo', photo.image)
      try{
        const response = await fetch('/api/v1/users/profile', {
          method: 'POST',
          headers: new Headers ({
            "Accept": "image/jpeg/png"
          }),
          body: newBody
        })
        if(!response.ok){
          if(response.status === 422){
            const body = await response.json()
          }
          throw new Error(`${response.status} ${response.statusText}`)
        }
        const body = await response.json()
        // props.setCurrentUser(body.userInfo)
        // setShouldRedirect(true)
      }catch(error){
        console.log(`Error in fetch: ${error}`)
      }
    }

  if(clicked){
    return(
      <>
        <Dropzone onDrop={onDrop} profilePhoto={photo.image}/>
        <button className="button" onClick={handleClick}>back</button>
        <button className="button" onClick={savePhoto}>Save Photo</button>
      </>
    )
  }

  return (
    <>
      <button className="button" onClick={handleClick}>Add photo</button>
    </>
  )
}

export default RoutePhoto





