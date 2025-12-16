const Registration = require('../models/Registration');
const Event = require('../models/Event');

// Helper to generate a random Ticket ID
const generateTicketId = () => {
  return 'TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

// @desc    Register for an event (Public User)
// @route   POST /api/registrations
// @access  Public
const registerForEvent = async (req, res) => {
  const { eventId, userName, userEmail } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if seats are available 
    const approvedCount = await Registration.countDocuments({ eventId, status: 'Approved' });
    if (approvedCount >= event.ticketLimit) {
      return res.status(400).json({ message: 'Event is fully booked' });
    }

    // Determine Status based on Event Mode
    // If 'Auto', approve immediately. If 'Manual', set to 'Pending'.
    const initialStatus = event.approvalMode === 'Auto' ? 'Approved' : 'Pending';

    const registration = await Registration.create({
      eventId,
      userName,
      userEmail,
      status: initialStatus,
      ticketId: generateTicketId()
    });

    res.status(201).json(registration);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all registrations for a specific event (Organizer)
// @route   GET /api/registrations/event/:eventId
// @access  Private (Organizer )
const getEventRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ eventId: req.params.eventId });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve or Reject a registration
// @route   PATCH /api/registrations/:id
// @access  Private (Organizer)
const updateRegistrationStatus = async (req, res) => {
  const { status } = req.body; 

  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    registration.status = status;
    await registration.save();

    res.json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Single Registration by ID 
// @route   GET /api/registrations/:id
// @access  Public
const getRegistrationById = async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id).populate('eventId');
        if(!registration) return res.status(404).json({message: 'Ticket not found'});
        res.json(registration);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = { registerForEvent, getEventRegistrations, updateRegistrationStatus, getRegistrationById };