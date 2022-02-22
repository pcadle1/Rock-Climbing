import express from 'express'
import UserSerializer from '../../../serializers/UserSerializer.js'
import ClimberRouteSerializer from '../../../serializers/ClimberRouteSerializer.js'
import User from '../../../models/User.js'
const profileRouter  = new express.Router()


profileRouter.get('/:id', async (req, res) => {
  try{
    const climber = await User.query().findById(req.params.id)
    const serializedClimber = UserSerializer.getDetails(climber)
    let climberRoutes = await climber.$relatedQuery('routes')
    climberRoutes = await Promise.all(climberRoutes.map(async (route) => {
      const routeDetails = await route.$relatedQuery('climberRoutes')
      const userRouteDetails = routeDetails.filter((route) => route.climberId === req.params.id)
      route.details = ClimberRouteSerializer.getDetails(userRouteDetails[0])
      return route
    }))
    serializedClimber.routes = climberRoutes
    return res.status(200).json({ climber: serializedClimber })
  }catch(error){
    console.log(error)
    return res.status(500).json({ error})
  }
})

export default profileRouter