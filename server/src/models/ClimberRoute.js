const Model = require('./Model.js')

class ClimberRoute extends Model {
  static get tableName() {
    return 'climberRoutes'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['climberId', 'routeId'],
      properties: {
        climberId: {type: 'string'},
        routeId: {type: 'string'},
        ticks: {type: ['string', 'integer']},
        rating: {type: ['string', 'integer']},
        review: {type: 'string'},
        image: {type: 'string'}
      }
    }
  }

  static get relationMappings() {
    const User = require('./User.js')
    const Route = require('./Route.js')

    return { 
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'climberRoutes.climberId',
          to: 'users.Id'
        }
      },
      route: {
        relation: Model.BelongsToOneRelation,
        modelClass: Route,
        join: {
          from: 'climberRoutes.routeId',
          to: 'routes.Id'
        }
      }
    }
  }
}

module.exports = ClimberRoute