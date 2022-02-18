
class ClimberRouteSerializer{
  static getDetails(details){
    const allowedAttributes = ['rating', 'review', 'ticks', 'image', 'updatedAt']
    const serializedData = {}
    for(const attribute of allowedAttributes){
      serializedData[attribute] = details[attribute]
    }

    return serializedData
  }
}

export default ClimberRouteSerializer