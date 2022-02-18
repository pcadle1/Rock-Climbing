import React, { useState, useCallback } from 'react'
import Dropzone from './Dropzone'
const EditRoute = (props) => {
  const [formInput, setFormInput] = useState({
    review: '',
    rating: 0,
    image: {}
  })
  const [clicked, setClicked] = useState(null)

  const onDrop = useCallback(acceptedFiles => {
    setFormInput({...formInput, image: Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])})})
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    setClicked(!clicked)
  }

  const handleInputChange = (event) => {
    setFormInput({...formInput, [event.currentTarget.name]: event.currentTarget.value})
  }

  const save = async (event) => {
      event.preventDefault()
      const newBody = new FormData()
      newBody.append('review', formInput.review)
      newBody.append('rating', formInput.rating)
      newBody.append('image', formInput.image)
      try{
        const response = await fetch(`api/v1/routes/${props.route.id}`, {
          method: 'PATCH',
          headers: new Headers ({
            "Accept": "image/jpeg/png"
          }),
          body: newBody
        })
        const body = await response.json()
        const replacedRoute = props.routes.find(route => route.id === body.route.id)
        const index = props.routes.indexOf(replacedRoute)
        props.routes.splice(index, 1, body.route)
        const newRoutes = [...props.routes]
        props.setRouteList(newRoutes)
        setClicked(false)
        if(!response.ok){
          if(response.status === 422){
            const body = await response.json()
          }
          throw new Error(`${response.status} ${response.statusText}`)
        }
      }catch(error){
        console.log(`Error in fetch: ${error}`)
      }
    }

  if(clicked){
    return(
      <>
        <Dropzone onDrop={onDrop} image={formInput.image}/>
        <form className="edit-form" onSubmit={save}>
          <label htmlFor="review">Review/notes</label>
          <input className="form-input" type="text" name="review" onChange={handleInputChange} value={formInput.review}></input>
          <label htmlFor="rating">
          Rating:
            <select
              className="form-input"
              id="rating"
              name="rating"
              onChange={handleInputChange}
              >
                <option value="">Select a rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
          </label>
          <input type="submit" className="button"></input>
        </form>
        <button className="button" onClick={handleClick}>back</button>
      </>
    )
  }

  return (
    <>
      <button className="button" onClick={handleClick}>Add details</button>
    </>
  )
}

export default EditRoute





