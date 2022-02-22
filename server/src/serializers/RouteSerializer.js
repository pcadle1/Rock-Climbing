class RouteSerializer {
  static async getSummary(routes){
    const allowedAttributes = ['name', 'yds', 'type', 'lat', 'lng', 'meta_parent_sector']
    const serializedRoutes = routes.map((route) => {
      let serializedRoute = {}
      for (const attribute of allowedAttributes){
        serializedRoute[attribute] = route[attribute]
      }
      return serializedRoute
    })

    return serializedRoutes
  }

}

export default RouteSerializer