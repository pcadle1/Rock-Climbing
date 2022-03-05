
class MessageSerializer{
  static async getSummary(messages){
    const allowedAttributes = ['messageText', 'createdAt', 'senderId']
    const serializedMessages = await Promise.all(messages.map(async message => {
      let serializedMessage = {}
      for(const attribute of allowedAttributes){
        serializedMessage[attribute] = message[attribute]
      }
      return serializedMessage
    }))

    return serializedMessages
  }

  static getDetails(message){
    const allowedAttributes = ['messageText', 'createdAt', 'senderId']
    let serializedMessage = {}
    for(const attribute of allowedAttributes){
      serializedMessage[attribute] = message[attribute]
    }
    return serializedMessage
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