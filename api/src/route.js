const express = require('express');
const router = express.Router();
const controller = require('./controllers/controller');

router.get('/properties', controller.getProperties);
router.get('/properties/:id', controller.getPropertyById);
router.post('/properties/find', controller.findProperties);
router.get('/display/:id', controller.displayProperty);

module.exports = router;
