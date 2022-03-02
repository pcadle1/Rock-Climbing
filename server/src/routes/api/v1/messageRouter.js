import express from 'express'
import Message from '../../../models/Message.js'
import MessageSerializer from '../../../serializers/MessageSerializer.js'

const messageRouter = new express.Router()

messageRouter.get('/', async (req, res) => {
  try{
    const messages = await Message.query().where('receiverId', '=', req.user.id)
    const serializedMessages = await MessageSerializer.getSummary(messages)
    return res.status(200).json({ messages: serializedMessages })
  }catch(error){
    console.log(error)
    return res.status(500).json({ error })
  }
})


export default messageRouter