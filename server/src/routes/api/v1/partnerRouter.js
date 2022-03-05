import express from 'express'
import User from '../../../models/User.js'
import UserSerializer from '../../../serializers/UserSerializer.js'
import Partner from '../../../models/Partner.js'

const partnerRouter = new express.Router()

partnerRouter.get('/', async (req, res) => {
  try{
    let partners
    let serializedPartners
    if(req.query.search){
      partners = await User.query().where('location', 'ilike', `%${req.query.search}%`)
      serializedPartners = UserSerializer.getSummary(partners)
    }else if (req.query.name){
      partners = await User.query().where('name', 'ilike', `%${req.query.name}%`).limit(20)
      serializedPartners = UserSerializer.getSummary(partners)
    }else{
      const allPartners = await User.query().limit(10)
      serializedPartners = UserSerializer.getSummary(allPartners)
    }
    return res.status(200).json({ partners: serializedPartners })
  }catch(error){
    console.log(error)
    return res.status(500).json({ error })
  }
})

partnerRouter.get('/following', async (req, res) => {
  try{
    const user = await User.query().findById(req.user.id)
    const following = await user.$relatedQuery('partners')
    return res.status(200).json({ following })
  }catch(error){
    return res.status(500).json({ error })
  }
})

partnerRouter.post('/:id', async (req, res) => {
  let partnership
  try{
    const existingPartner = await Partner.query().findOne({user1Id: req.user.id, user2Id: req.params.id})
    if (!existingPartner){
      partnership = await Partner.query().insertAndFetch({user1Id: req.user.id, user2Id: req.params.id})
    }
    return res.status(201).json({ partnership })
  }catch(error){
    return res.status(500).json({ error })
  }
})



export default partnerRouter