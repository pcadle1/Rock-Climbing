import express from 'express'
import got from 'got'
import RouteSerializer from '../../../serializers/RouteSerializer.js'
import GeoCoder from '../../../services/Geocoder.js'
const routeRouter = new express.Router()

routeRouter.get('/:zip&:radius', async (req, res) => {
  const { zip, radius }= req.params
  const coords = await GeoCoder.zipToLatLon(zip)
  try{
    const response = await got(`https://climb-api.openbeta.io/geocode/v1/climbs?latlng=${coords.lat},${coords.lon}&radius=${radius}`)
    const body = JSON.parse(response.body)
    const serializedRoutes = await RouteSerializer.getSummary(body)
    return res.status(200).json({ routes: serializedRoutes })
  }catch(error){
    return res.status(500).json({ error })
  }
})

export default routeRouter


