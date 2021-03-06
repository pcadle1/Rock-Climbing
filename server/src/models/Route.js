const Model = require('./Model.js')

class Route extends Model {
  static get tableName() {
    return 'routes'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'type'],
      properties: {
        name: {type: 'string'},
        grade: {type: 'string'},
        type: {type: 'string'},
        lat: {type: ['string', 'number']},
        lng: {type: ['string', 'number']},
        sector: {type: 'string'}
      }
    }
  }

  static get relationMappings() {
    const User = require('./User.js')
    const ClimberRoute = require('./ClimberRoute.js')

    return { 
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'routes.id',
          through: {
            from: 'climberRoutes.routeId',
            to: 'climberRoutes.climberId'
          },
          to: 'users.id'
        }
      },
      climberRoutes: {
        relation: Model.HasManyRelation,
        modelClass: ClimberRoute,
        join: {
          from: 'routes.id',
          to: 'climberRoutes.routeId'
        }
      }
    }
  }
}

module.exports = Route