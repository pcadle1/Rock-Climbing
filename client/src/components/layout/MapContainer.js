import React, { useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const MapContainer = (props) => {

  const mapDimensions = {
    height: '50vh',
    width: '50%'
  }

  let defaultCenter = {
    lat: 42.364506, lng: 	-71.038887
  }

  const markers = props.routes.map((route) => {
    return <Marker position={{lat: route.lat ,lng: route.lng}}/>
  })

  return(
    <>
    <LoadScript googleMapsApiKey="AIzaSyDqSAAXtxlZ19w9sGdlSkuClTSvkG8a4yM">
      <GoogleMap
        mapContainerStyle={mapDimensions}
        zoom={10}
        center={defaultCenter}>
        {markers}  
      </GoogleMap>

    </LoadScript>
    </>
  )
}


export default MapContainer