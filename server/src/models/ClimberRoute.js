const Model = require('./Model.js')

class climberRoute extends Model {
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
        ticks: {type: ['string', 'integer']}
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

module.exports = climberRoute