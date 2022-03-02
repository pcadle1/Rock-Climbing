const Model = require('./Model.js')

class Message extends Model{
  static get tableName(){
    return 'messages'
  }

  static get jsonSchema(){
    return {
      type: 'object',
      required: ['messageText'],
      properties: {
        senderId: {type: ['string', 'integer']},
        receiverId: {type: ['string', 'integer']},
        messageText: {type: 'string'}
      }
    }
  }

  static get relationMappings(){
    const User = require('./User.js')
    
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'messages.senderId',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Message