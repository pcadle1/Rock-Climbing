import Route from '../../models/Route.js'

class RouteSeeder {
  static async seed() {
    const routeData = [
      {
        name: 'Hobbit Hole',
        grade: 'V3',
        type: 'Boulder'
      },
      {
        name: 'Espresso',
        grade: '5.10d',
        type: 'Sport'
      },
      {
        name: 'Whitney Gilman Ridge',
        grade: '5.7',
        type: 'Trad'
      }
    ]
    for (const route of routeData){
      const currentRoute = await Route.query().findOne(route)
      if(!currentRoute) {
          await Route.query().insert(route)
      }
    }
  }

}

export default RouteSeeder