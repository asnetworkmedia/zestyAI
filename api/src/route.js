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
 * /properties/find:
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
