import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const Dropzone = (props) => {
  const {onDrop, profilePhoto} = props
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
        <div className="dropzone" {...getRootProps()}>
          <input {...getInputProps()}/>
          {isDragActive ? <p>Drop your photo here</p> : <p>Drag 'n' drop your photo here or click to upload photo</p>}
          <img className="profile-photo" src={profilePhoto.preview}></img>
        </div>
  )
}

export default Dropzone