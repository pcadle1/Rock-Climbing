
class MessageSerializer{
  static async getSummary(messages){
    const allowedAttributes = ['messageText', 'createdAt']
    const serializedMessages = await Promise.all(messages.map(async message => {
      let serializedMessage = {}
      for(const attribute of allowedAttributes){
        serializedMessage[attribute] = message[attribute]
      }
      return serializedMessage
    }))

    return serializedMessages
  }

  static async getSenderSummary(messages){
    const allowedAttributes = ['id', 'name', 'image']
    const senders = await Promise.all(messages.map(async (message) => {
      let serializedSender = {}
      const sender = await message.$relatedQuery('user')
      for(const attribute of allowedAttributes){
        serializedSender[attribute] = sender[attribute]
      }
      return serializedSender
    }))
    return senders
  }
}

export default MessageSerializer