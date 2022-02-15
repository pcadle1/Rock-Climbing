import Route from '../../models/Route.js'

class RouteSeeder {
  static async seed() {
    const routeData = [
      {
        name: 'Hobbit Hole',
        grade: 'V3',
        type: 'Boulder',
        lat: 42.8806425,
        lng:-71.3272856
      },
      {
        name: 'Espresso',
        grade: '5.10d',
        type: 'Sport',
        lat: 42.8806425,
        lng:-71.3272856
      },
      {
        name: 'Whitney Gilman Ridge',
        grade: '5.7',
        type: 'Trad',
        lat: 42.8806425,
        lng:-71.3272856
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