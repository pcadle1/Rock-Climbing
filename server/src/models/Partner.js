const Model = require('./Model.js')

class Partner extends Model{
  static get tableName(){
    return 'partners'
  }
}

module.exports = Partner