import express from 'express'
import Message from '../../../models/Message.js'
import MessageSerializer from '../../../serializers/MessageSerializer.js'

const messageRouter = new express.Router()

messageRouter.get('/', async (req, res) => {
  try{
    const receivedMessages = await Message.query().where('receiverId', '=', req.user.id).where('senderId', '=', req.query.id).limit(20)
    const sentMessages = await Message.query().where('senderId', '=', req.user.id).where('receiverId', '=', req.query.id).limit(20)
    const allMessages = receivedMessages.concat(sentMessages)
    const messages = allMessages.sort((a, b) => a.createdAt - b.createdAt)
    const serializedMessages = await MessageSerializer.getSummary(messages)
    return res.status(200).json({ messages: serializedMessages })
  }catch(error){
    return res.status(500).json({ error })
  }
})

messageRouter.get('/senders', async (req, res) => {
  try{
    const messages = await Message.query().where('receiverId', '=', req.user.id)
    const senders = await MessageSerializer.getSenderSummary(messages)
    const sentMessages = await Message.query().where('senderId', '=', req.user.id)
    const receivers = await MessageSerializer.getReceiverSummary(sentMessages)
    let unique = [...new Map(senders.concat(receivers).map((sender) => [sender["id"], sender])).values()]
    return res.status(200).json({ senders: unique })
  }catch(error){
    console.log(error)
    return res.status(500).json({ error })
  }
})

messageRouter.post('/', async (req, res) => {
  try{
    const message = await Message.query().insertAndFetch({senderId: req.user.id, receiverId: req.body.recipient, messageText: req.body.message})
    const serializedMessage = MessageSerializer.getDetails(message)
    return res.status(201).json({ message: serializedMessage })
  }catch(error){
    console.log(error)
    return res.status(500).json({ error })
  }
})

export default messageRouter