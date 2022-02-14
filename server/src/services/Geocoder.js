import got from 'got'

class GeoCoder{
  static async zipToLatLon(zip){
    try{
      const API_KEY = process.env.GEOCODING_KEY
      const response = await got(`https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&components=postal_code:${zip}`)
      const body = await JSON.parse(response.body)
      const location = {
        lat: body.results[0].geometry.location.lat,
        lon: body.results[0].geometry.location.lng
      }
      return location
    }catch(error){
      console.log(error)
    }
  }
}

export default GeoCoder