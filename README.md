# Node.js Fetch XML And Convert to JSON Service

A Node.js service which gets XML data from the [Canadian Department of Transportation](https://vpic.nhtsa.dot.gov/api), converts it to JSON, and saves it to a MongoDB database. It also updates the database every night. GET / GQL endpoints are exposed to retrieve this data.

## Guide
### Setup Database Connection
* Deploy a database cluster on [MongoDB](https://www.mongodb.com/).
* Take note of the following environment variables you will need:
    * **DB_USER** - Database user name
    * **DB_PASSWORD** - Database user password
    * **DB_CLUSTER** - Database cluster name

### Run (Locally)
* Add the required environment variables by running `export [VARIABLE NAME HERE]=[VARIABLE VALUE HERE])`.
* Run `npm start` to start the service. Make any requests from a separate terminal.

### Run (From Docker Container)
* Run `docker build -t nodejs-fetch-xml-and-convert-to-json-service .` to build the image.
* Run `docker run -dp 127.0.0.1:3000:3000 -e DB_USER=[VARIABLE VALUE HERE] -e DB_PASSWORD=[VARIABLE VALUE HERE] -e DB_CLUSTER=[VARIABLE VALUE HERE] nodejs-fetch-xml-and-conve
rt-to-json-service`, which will start the service before returning to terminal prompt.
* Run `docker ps` to verify that a container is running, or check Docker Desktop.

### Fetching Data
* Run `curl http://localhost:3000/vehicles/makes` to fetch Vehicle Makes and Types.
  * The service will initially check the database (Refreshed every night at 00:00, using data from [vPIC](https://vpic.nhtsa.dot.gov/api)).
  * If database is empty, it is populated using [vPIC's API](https://vpic.nhtsa.dot.gov/api) before returning the newly stored data.
* You can also access this data using GraphQL:
  * Run: `curl -X POST -H "Content-Type: application/json" --data '{ "query": "{ makes { makeId makeName vehicleTypes { typeId typeName } } }" }' http://localhost:3000/gql/vehicles`, or use a GraphQL client tool.
  * Like above, the database will be populated if it is empty.
