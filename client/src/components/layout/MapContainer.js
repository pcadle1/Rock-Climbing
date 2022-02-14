import React, { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'

const MapContainer = (props) => {
  const [selected, setSelected] = useState()

  const mapDimensions = {
    height: '50vh',
    width: '50%'
  }

  let defaultCenter = {
    lat: 42.364506, lng: 	-71.038887
  }

  const handleSelect = (route) => {
    setSelected({lat: route.lat, lng: route.lng})
  }

  const markers = props.routes.map((route) => {
    return <Marker 
            position={{lat: route.lat ,lng: route.lng}}
            onClick={() => handleSelect(route)}
          ></Marker>
  })

  let info
  if(selected){
    defaultCenter=selected
    info = <InfoWindow
              position={selected}
              onCloseClick={() => setSelected()}
              >
              <div>hey there</div>
            </InfoWindow>
  }
  return(
    <>
    <LoadScript googleMapsApiKey="AIzaSyDqSAAXtxlZ19w9sGdlSkuClTSvkG8a4yM">
      <GoogleMap
        mapContainerStyle={mapDimensions}
        zoom={10}
        center={defaultCenter}>
        {markers}  
        {info}
      </GoogleMap>
    </LoadScript>
    </>
  )
}


export default MapContainer