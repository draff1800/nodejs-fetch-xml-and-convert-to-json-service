# Node.js Fetch XML And Convert to JSON Service

A Node.js service which gets XML data from the [Canadian Department of Transportation](https://vpic.nhtsa.dot.gov/api), converts it to JSON, and saves it to a MongoDB database. It also updates the database every night. GET / GQL endpoints are exposed to retrieve this data.

## Guide
* Deploy a database cluster on [MongoDB](https://www.mongodb.com/).
* Add the following environment variables (You can do so by running `export [VARIABLE NAME HERE]=[VARIABLE VALUE HERE])`:
    * **DB_USER** - Database user name
    * **DB_PASSWORD** - Database user password
    * **DB_CLUSTER** - Database cluster name

<br />

* Run `npm start` to run the service. This also schedules a database refresh each midnight, using data from [vPIC](https://vpic.nhtsa.dot.gov/api).
* In a new terminal, run `curl http://localhost:3000/vehicles/makes` to fetch Vehicle Makes and Types.
  * The service will initially check the database.
  * If database is empty, it will be populated using [vPIC's API](https://vpic.nhtsa.dot.gov/api) before returning the newly stored data.
* You can also access this data using GraphQL:
  * Run: `curl -X POST -H "Content-Type: application/json" --data '{ "query": "{ makes { makeId makeName vehicleTypes { typeId typeName } } }" }' http://localhost:3000/gql/vehicles`, or use a GraphQL client tool.
  * Like above, the database will be populated if it is empty.
