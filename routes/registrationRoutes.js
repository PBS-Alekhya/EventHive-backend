const express = require('express');
const router = express.Router();
const { 
  registerForEvent, 
  getEventRegistrations, 
  updateRegistrationStatus,
  getRegistrationById 
} = require('../controllers/registrationController');
const { protect } = require('../middleware/authMiddleware');


router.post('/', registerForEvent);


router.get('/:id', getRegistrationById);

router.get('/event/:eventId', protect, getEventRegistrations);
router.patch('/:id', protect, updateRegistrationStatus);

module.exports = router;