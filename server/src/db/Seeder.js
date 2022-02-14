/* eslint-disable no-console */
import { connection } from "../boot.js"
import RouteSeeder from "./seeders/RouteSeeder.js"
class Seeder {
  static async seed() {
    console.log('Seeding Routes')
    await RouteSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder