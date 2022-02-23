import React, { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'

const MapContainer = (props) => {

  const mapDimensions = {
    height: '60vh',
    width: '100%'
  }

  const markers = props.routes.map((route, idx) => {
    return <Marker 
    key={idx}
    position={{lat: route.lat ,lng: route.lng}}
    onClick={() => props.handleSelect(route)}
    ></Marker>
  })
  
  let info
  let defaultCenter

  if(props.routes.length > 0){
    defaultCenter = {lat: props.routes[0].lat, lng: props.routes[0].lng}
  }else{
    defaultCenter = {
      lat: 42.364506, lng: 	-71.038887
    }
  }

  if(props.selectedArea){
    defaultCenter=props.selectedArea
    info = <InfoWindow
              position={props.selectedArea}
              onCloseClick={() => setSelected()}
              >
              <div>
                <a href={`https://www.google.com/maps?saddr=My+Location&daddr=${props.selectedArea.lat},${props.selectedArea.lng}`} target="_blank">Directions</a>
              </div>
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