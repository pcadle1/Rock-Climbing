import express from 'express'
import User from '../../../models/User.js'
import UserSerializer from '../../../serializers/UserSerializer.js'

const partnerRouter = new express.Router()

partnerRouter.get('/', async (req, res) => {
  try{
    const allPartners = await User.query()
    const serializedPartners = UserSerializer.getSummary(allPartners)
    return res.status(200).json({ partners: serializedPartners })
  }catch(error){
    return res.status(500).json({ error })
  }
})


export default partnerRouter