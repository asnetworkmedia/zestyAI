const express = require('express');
const router = express.Router();
const controller = require('./controllers/controller');

/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Get all properties
 *     description: Retrieve a list of all properties
 *     tags:
 *       - Properties
 *     responses:
 *       200:
 *         description: Successfully retrieved properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 example: [
 *                   {
 *                     "id": "<string>",
 *                     "geocode_geo": {
 *                       "type": "<string>",
 *                       "coordinates": [
 *                         <longitude>,
 *                         <latitude>
 *                       ]
 *                     },
 *                     "parcel_geo": {
 *                       "type": "<string>",
 *                       "coordinates": [
 *                         [
 *                           [<longitude>, <latitude>],
 *                           [<longitude>, <latitude>],
 *                           [<longitude>, <latitude>],
 *                           [<longitude>, <latitude>],
 *                           [<longitude>, <latitude>]
 *                         ]
 *                       ]
 *                     },
 *                     "building_geo": {
 *                       "type": "<string>",
 *                       "coordinates": [
 *                         [
 *                           [<longitude>, <latitude>],
 *                           [<longitude>, <latitude>],
 *                           [<longitude>, <latitude>],
 *                           [<longitude>, <latitude>],
 *                           [<longitude>, <latitude>],
 *                           [<longitude>, <latitude>],
 *                           [<longitude>, <latitude>]
 *                         ]
 *                       ]
 *                     },
 *                     "image_bounds": [
 *                       <longitude>,
 *                       <latitude>,
 *                       <longitude>,
 *                       <latitude>
 *                     ],
 *                     "image_url": "<string>"
 *                   }
 *                 ]
 */
router.get('/properties', controller.getProperties);

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Get a property by ID
 *     description: Retrieve a specific property by its ID
 *     tags:
 *       - Properties
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The property ID
 *     responses:
 *       200:
 *         description: Property found
 *       404:
 *         description: Property not found
 */
router.get('/properties/:id', controller.getPropertyById);

/**
 * @swagger
 * /find:
 *   post:
 *     summary: Find properties
 *     description: Search for properties based on criteria
 *     tags:
 *       - Properties
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: {
 *               "type": "Feature",
 *               "geometry": {
 *                 "type": "Point",
 *                 "coordinates": [-80.0782213, 26.8849731]
 *               },
 *               "x-distance": 1755000
 *             }
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Invalid search criteria
 */
router.post('/find', controller.findProperties);

/**
 * @swagger
 * /display/{id}:
 *   get:
 *     summary: Display property with overlays
 *     description: Get property information with geographic overlays
 *     tags:
 *       - Display
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The property ID
 *     responses:
 *       200:
 *         description: Property display data
 *       404:
 *         description: Property not found
 */
router.get('/display/:id', controller.displayProperty);

module.exports = router;
