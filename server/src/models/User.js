/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],
      properties: {
        email: { type: "string", format: "email" },
        cryptedPassword: { type: "string" },
        name: {type: 'string'},
        age: {type: ['string', 'integer']},
        location: {type: 'string'},
        grade: {type: 'string'},
        image: {type: 'string'},
        details: {type: 'string'},
        style: {type: 'string'}
      },
    };
  }

  static get relationMappings(){
    const Route = require('./Route.js')
    const ClimberRoute = require('./ClimberRoute.js')
    return {
      routes: {
        relation: Model.ManyToManyRelation,
        modelClass: Route,
        join:{
          from: 'users.id',
          through: {
            from: 'climberRoutes.climberId',
            to: 'climberRoutes.routeId'
          },
          to: 'routes.id'
        }
      },
      climberRoute: {
        relation: Model.HasManyRelation,
        modelClass: ClimberRoute,
        join: {
          from: 'users.id',
          to: 'climberRoutes.climberId'
        }
      }
    }
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
