const express = require('express');
const router = express.Router();
const { createEvent, getMyEvents, getEventById } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');


router.route('/')
  .post(protect, createEvent)
  .get(protect, getMyEvents);

// This route is public because anyone can view event details (for public users)
router.route('/:id').get(getEventById);

module.exports = router;