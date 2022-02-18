import React, { useState, useCallback } from 'react'
import Dropzone from './Dropzone'
import gradeData from '../../../gradeData'
import { Redirect } from 'react-router'
const NewProfileForm = (props) => {

  const [formInput, setFormInput] = useState({
    name: '',
    age: '',
    location: '',
    blurb: '',
    style: '',
    grade: '',
    image: {}
  })
  const [profileDetails, setProfileDetails] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const onDrop = useCallback(acceptedFiles => {
    setFormInput({...formInput, image: Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])})})
  }, [])

  const handleInputChange = (event) => {
    event.preventDefault()
    setFormInput({
      ...formInput, [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const submitForm = async (event) => {
    event.preventDefault()
    const newBody = new FormData()
    newBody.append('name', formInput.name)
    newBody.append('age', formInput.age)
    newBody.append('location', formInput.location)
    newBody.append('details', formInput.blurb)
    newBody.append('style', formInput.style)
    newBody.append('grade', formInput.grade)
    newBody.append('image', formInput.image)
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
      props.setCurrentUser(body.userInfo)
      setShouldRedirect(true)
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }

  const allGrades = gradeData.boulder.concat(gradeData.sport)
  const gradeOptions = allGrades.map((grade) => {
    return <option value={grade} key={grade}>{`${grade}`}</option>
  })

  if(shouldRedirect){
    return <Redirect 
            to={{
              pathname: "/profile",
              state: { profileDetails }
            }}/>
  }

  return (
    <div className="profile-form">
      <h1>Create Your Profile</h1>
      <Dropzone onDrop={onDrop} image={formInput.image}/>
      <form onSubmit={submitForm}>
        <label htmlFor="name">Name: </label>
        <input className="profile-form-input" type="text" name="name" value={formInput.name} onChange={handleInputChange}></input>

        <label htmlFor="age">Age: </label>
        <input className="profile-form-input" type="text" name="age" value={formInput.age} onChange={handleInputChange}></input>

        <label htmlFor="location">Location: </label>
        <input className="profile-form-input" type="text" name="location" value={formInput.location} onChange={handleInputChange}></input>

        <label htmlFor="style">Favorite style of climbing: </label>
        <input className="profile-form-input" type="text" name="style" value={formInput.style} onChange={handleInputChange}></input>

        <label htmlFor="grade">What is your max grade? 
          <select
          className="options"
            name="grade"
            onChange={handleInputChange}
            value={formInput.grade}>
                <option value=''>Please choose your max grade</option>
                {gradeOptions}
          </select>
        </label>
        

        <label htmlFor="blurb">Anything Else About You: </label>
        <input className="profile-form-input" type="text" name="blurb" value={formInput.blurb} onChange={handleInputChange}></input>

        <input type="submit" className="button"></input>
      </form>
    </div>
  )
}

export default NewProfileForm