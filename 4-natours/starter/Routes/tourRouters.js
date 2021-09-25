const express = require('express');

const tourController = require('../controllers/tourController');
const router = express.Router();

router.param('id', tourController.checkId); // param middleware

router.route('/:id').get(tourController.getTourByID);
router.route('/').get(tourController.getAllTours).post(tourController.addTour);

module.exports = router;
