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
 *           type: string
 *         description: The property ID
 *     responses:
 *       200:
 *         description: Property found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {
 *                 "id": "<string>",
 *                 "geocode_geo": {
 *                   "type": "<string>",
 *                   "coordinates": [
 *                     <longitude>,
 *                     <latitude>
 *                   ]
 *                 },
 *                 "parcel_geo": {
 *                   "type": "<string>",
 *                   "coordinates": [
 *                     [
 *                       [<longitude>, <latitude>],
 *                       [<longitude>, <latitude>],
 *                       [<longitude>, <latitude>],
 *                       [<longitude>, <latitude>],
 *                       [<longitude>, <latitude>]
 *                     ]
 *                   ]
 *                 },
 *                 "building_geo": {
 *                   "type": "<string>",
 *                   "coordinates": [
 *                     [
 *                       [<longitude>, <latitude>],
 *                       [<longitude>, <latitude>],
 *                       [<longitude>, <latitude>],
 *                       [<longitude>, <latitude>],
 *                       [<longitude>, <latitude>],
 *                       [<longitude>, <latitude>],
 *                       [<longitude>, <latitude>]
 *                     ]
 *                   ]
 *                 },
 *                 "image_bounds": [
 *                   <longitude>,
 *                   <latitude>,
 *                   <longitude>,
 *                   <latitude>
 *                 ],
 *                 "image_url": "<string>"
 *               }
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
 *                 "coordinates": [<longitude>, <latitude>]
 *               },
 *               "x-distance": <number>
 *             }
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["<string>"]
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
 *           type: string
 *         description: The property ID
 *       - in: query
 *         name: overlay
 *         schema:
 *           type: string
 *         description: Enable overlays
 *       - in: query
 *         name: parcel
 *         schema:
 *           type: string
 *         description: Parcel overlay color
 *       - in: query
 *         name: building
 *         schema:
 *           type: string
 *         description: Building overlay color
 *     responses:
 *       200:
 *         description: Property display data
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Property not found
 */
router.get('/display/:id', controller.displayProperty);

module.exports = router;
