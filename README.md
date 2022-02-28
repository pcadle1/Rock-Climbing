#Climb Buddy
Web application that allows rock climbers to find and save climbing routes, add route details, and connect with other rock climbers

Contributors: Paul Cadle
Name: Climb Buddy
Technologies: React, Express, Node, PostgreSQL, knex/objection, Google Geocoder/Maps API, OpenBeta API, image uploading with react dropzone/AWS S3

Heroku: http://launch-rock-climbing.herokuapp.com/

Description:
-Users can search for climbing routes by zipcode/search radius
-Routes are located using the OpenBeta API and Google Maps API
-Users can save routes to their profile
-Routes on a profile can be edited/deleted and details, rating or photos can be uploaded
-Climbers can search by location for other climbers and view other profiles
-Climbers can "follow" other profiles

Instructions:
-```yarn install```
-Create development PostgreSQL db by running ```createdb rockClimbing_development```
-From the server folder, 
  ```yarn migrate:latest```
  ```yarn db:seed```
-Create a .env file in the server folder and include the following:
  SESSION_SECRET="{your UUID here}"
  GEOCODING_KEY="{your Google Geocoder API key here}"

  For image uploading, configure S3 buckets and add the following to .env:
    AWS_ACCESS_KEY_ID="{your access key here}"
    AWS_SECRET_ACCESS_KEY="{your access key here}"
    S3_BUCKET_PRODUCTION=rock-climbing-production
    S3_BUCKET_DEVELOPMENT=rock-climbing-development

-From the root folder: ```yarn run dev```
-Navigate to localhost:3000 in your browser to use the application