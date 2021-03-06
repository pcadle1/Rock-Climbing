import express from 'express'
import got from 'got'
import RouteSerializer from '../../../serializers/RouteSerializer.js'
import GeoCoder from '../../../services/Geocoder.js'
import Route from '../../../models/Route.js'
import User from '../../../models/User.js'
import uploadImage from '../../../services/uploadImage.js'
import ClimberRoute from '../../../models/ClimberRoute.js'
import ClimberRouteSerializer from '../../../serializers/ClimberRouteSerializer.js'
const routeRouter = new express.Router()

routeRouter.get('/', async (req, res) => {
  const { zip, radius }= req.query
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

routeRouter.get('/user', async (req, res) => {
  try{
    const user = await User.query().findById(req.user.id)
    let  userRoutes = await user.$relatedQuery('routes')
    userRoutes = await Promise.all(userRoutes.map(async (route) => {
      const routeDetails = await route.$relatedQuery('climberRoutes')
      const userRouteDetails = routeDetails.filter((route) => route.climberId === req.user.id)
      route.details = ClimberRouteSerializer.getDetails(userRouteDetails[0])
      return route
    }))
    return res.status(200).json({ routes: userRoutes })
  }catch(error){
    console.log(error)
    return res.status(500).json({ error })
  }
})

routeRouter.post('/', async (req, res) => {
  try{
    const { name, yds, lat, lng, meta_parent_sector } = req.body
    const user = await User.query().findById(req.user.id)
    const existingRoute = await Route.query().findOne({name: name})
    let insertion
    if(!existingRoute){
      insertion = await user.$relatedQuery('routes').insertAndFetch({
        name: name,
        grade: yds,
        type: Object.keys(req.body.type)[0],
        lat: lat,
        lng: lng,
        sector: meta_parent_sector
      })
    }else{
      await user.$relatedQuery('routes').relate(existingRoute)
    }
    return res.status(201).json({ route: insertion})
  }catch(error){
    console.log(error)
    return res.status(500).json({ error })
  }
})

routeRouter.post('/:id', async (req, res) => {
  try{
    const route = await ClimberRoute.query().findOne({climberId: req.user.id, routeId: req.params.id})
    const updatedRoute = await route.$query().patchAndFetch({ticks: req.body.numTicks})
    const returnedRoute = await Route.query().findById(req.params.id)
    returnedRoute.details = ClimberRouteSerializer.getDetails(updatedRoute)
    return res.status(201).json({ route: returnedRoute })
  }catch(error){
    console.log(error)
    return res.status(500).json({ error })
  }
})

routeRouter.patch('/:id', uploadImage.single('image'), async (req, res) => {
  try{
    const { body } = req
    const newBody = {...body}
    newBody.image = req.file?.location
    const route = await ClimberRoute.query().findOne({climberId: req.user.id, routeId: req.params.id})
    const patch = await route.$query().patchAndFetch(newBody)
    const returnedRoute = await Route.query().findById(req.params.id)
    returnedRoute.details = ClimberRouteSerializer.getDetails(patch)
    return res.status(201).json({route: returnedRoute})
  }catch(error){
    console.log(error)
    return res.status(500).json({error })
  }
})

routeRouter.delete('/:id', async (req, res) => {
  try{
    const route = await ClimberRoute.query().findOne({climberId: req.user.id, routeId: req.params.id}).delete()
    return res.status(201).json({ route })
  }catch(error){
    return res.status(500).json({ error })
  }
})

export default routeRouter


