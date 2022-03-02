
class MessageSerializer{
  static async getSummary(messages){
    const allowedAttributes = ['messageText', 'createdAt']
    const serializedMessages = await Promise.all(messages.map(async message => {
      let serializedMessage = {}
      for(const attribute of allowedAttributes){
        serializedMessage[attribute] = message[attribute]
      }
      const sender = await message.$relatedQuery('user')
      serializedMessage.sender = { name: sender.name }
      serializedMessage.sender.image = sender.image
      return serializedMessage
    }))

    return serializedMessages
  }
}

export default MessageSerializer