## Project

Your goal is to create a full-stack web application that allows users to search for and retrieve information about real estate properties (see [Feature List](#feature-list)). Using your language(s) and framework(s) of choice, you will need to create a front-end and back-end (see [API Specification](#api-specification)) for your application and connect to the provided PostgreSQL database (see [Setup](#setup)). Your UI and API should both be packaged as containerized services (Docker images).

Note that some features are more difficult than others, and you will be evaluated on more than just the number of
features completed. Quality is preferred over quantity. Design, organize, and comment your code as you would a typical 
production project. Be prepared to discuss decisions you made.

## Technologies Used
  "Frontend": 
      Vue.js CLI
      Tailwind CSS

  "Backend": 
    Use Node.js
    Express.js
    Sequelize.js            # ORM 
    Swagger.js              # API documentation
    Jest.js                 # api endpoint test scripts
 
## Project Structure

project-root/
|--app/                        # Frontend
|  |-- packages.json
|  |-- src/
|    |-- index.js             # Staring file of the app
|    |-- components/           # Contain shared Components in all pages
|    |-- pages/
|       |-- listing/           # Contain listing page and search
|         |-- Listing.vue
|         |-- components/      # Contain components used in Listing.vue
|       |- property/
|         |-- Property.vue
|         |-- components/      # Contain components used in Property.vue
|
|
|--api/                        # Backend
|  |-- src/                    # Contains service files
|     |-- controllers/         # Contains service modules and classes
|       |-- controller.js     # to handle API endpoint request
|       |-- db.js             # to handle Sequelize connection
|     |-- models/              # Contain Sequelize model and schema. Use init-db/01-setup.sql file in this folder to create Sequelize model and schema
|     |-- tests/
|       |-- test.js           # "Testing endpoints"
|   -- route.js               # API route setup
|   -- index.js               # starting file the API service
|-- packages.json           
|-- README.md                 # Project documentation
|-- LICENSE                   # Project License
|-- Changelog.md              # Change history


## Feature List

* **List all properties:** Display, in a tabular format, all properties and their geographic location (longitude and 
  latitude).
  
* **Property detail page:** Show detailed information about a given property, including its image and geographic location.

* **Search by coordinates:** Prompt the user for a longitude, latitude, and search radius (default 10000 meters) and 
  display, in a tabular format, the results of the search, including the properties' geographic location (longitude and 
  latitude).

* **Image overlays:** Add polygonal overlays to property images to represent either the parcel, building, or both 
  (`parcel_geo` and `buildings_geo` fields in the database).

* **Containerization:** Include Docker image(s) of your application when submitting your final code.

## Setup

### Development environment requirements
You will need to install [Docker](https://www.docker.com/products/docker-desktop) and 
[`docker-compose`](https://docs.docker.com/compose/install/) to run the example database.

### Database startup
From the repo root folder, run `docker-compose up -d` to start the PostgreSQL database needed for this example. The 
database server will be exposed on port **5555**. If this port is not available on your computer, feel free to change 
the port in the `docker-compose.yml` file.

In the test database, there is a single table called `properties` (with 5 sample rows), where each row represents a 
property or address. There are three geography<sup>*</sup> fields and one field with an image URL pointing to an image on [Google Cloud Storage](https://cloud.google.com/storage/).

<sup>*</sup> *If you are not familiar with [PostgreSQL](https://www.postgresql.org/) or [PostGIS](https://postgis.net/), you may need to read up beforehand.*

## API Specification
The API you will be implementing for this project must adhere to the following API specification:

***

### GET /properties
*Lists all properties.*

`example: GET localhost:1235/properties`

##### Response
JSON array of property objects

***

### POST /find
*Finds properties within X meters away from provided geojson point.*

`example: POST localhost:1235/find`

##### Request Body
- geojson object with x-distance property

```
example:

{
  "type": "Feature",
  "geometry": {
  "type": "Point",
  "coordinates": [-80.0782213, 26.8849731]
  },
  "x-distance": 1755000
}
```

##### Response
JSON array of property IDs

***

### GET /display/:id?(overlay=yes(&parcel=:parcelColor)(&building=:buildingColor))

*Fetches and displays property tile by ID. Optionally overlays parcel and building geometries on tile.*

`example: GET localhost:1235/display/f853874999424ad2a5b6f37af6b56610?overlay=yes&building=green&parcel=orange`

##### Request Parameters
- "id" | description: Property ID | type: string | required: true | validation: length greater than 0

- "overlay" | description: Overlays parcel and building geometries on tile | type: string | required: false | validation: enum("yes")

- "parcel" | description: Indicated building overlay color | type: string | required: false | validation: enum() ex. "red", "green", "orange"

- "building" | description: Indicates building overlay color | type: string | required: false | validation: enum() ex. "red", "green", "orange"

##### Response
JPEG image

## API Testing script

Write scripts for testing endpoints using Jest.js
Run test each time before starting the service

---

## Getting Started (local)

1. Start the database: `docker-compose up -d postgres` (exposes Postgres/PostGIS on port 5555).
2. Install dependencies:
  - `cd api && npm install`
  - `cd ../app && npm install`
3. Run the API: `cd api && npm run dev` (listens on port 1235).
4. Run the UI: `cd app && npm run serve` (listens on port 8080).
5. Open http://localhost:8080 to use the app. The UI expects `VUE_APP_API_BASE_URL` (default http://localhost:1235).

## Running Everything with Docker

```sh
docker-compose up --build
```

This builds and runs three services: `postgres` (db), `api` (Express/Sequelize), and `app` (Vue/Tailwind). UI will be at http://localhost:8080 and API at http://localhost:1235.

## API Endpoints

- `GET /properties` — list all properties with geojson data
- `GET /properties/:id` - Get a single property with geojson data
- `POST /find` — body: GeoJSON Point + `x-distance` meters → returns array of IDs
- `GET /display/:id?overlay=yes&parcel=orange&building=green` — returns JPEG (with optional overlays)
- `GET /docs` — Swagger UI

## Testing

Jest + Supertest live in `api/src/tests/test.js`. Requires the database running with seed data:

```sh
cd api
docker-compose up -d postgres  # from repo root
npm test
```

## Environment Variables

- API: `DB_HOST` (default `localhost`), `DB_PORT` (default `5555`), `DB_NAME` (`zesty`), `DB_USER` (`postgres`), `DB_PASSWORD` (`engineTest888`), `PORT` (`1235`).
- App: `VUE_APP_API_BASE_URL` (default `http://localhost:1235`).