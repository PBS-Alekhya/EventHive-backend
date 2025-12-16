const Event = require('../models/Event');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
const createEvent = async (req, res) => {
  const { title, description, date, venue, ticketLimit, approvalMode } = req.body;

  if (!title || !date || !venue || !ticketLimit) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  const event = await Event.create({
    organizerId: req.user._id, // Comes from the middleware
    title,
    description,
    date,
    venue,
    ticketLimit,
    approvalMode: approvalMode || 'Auto', 
  });

  res.status(201).json(event);
};

// @desc    Get logged-in user's events
// @route   GET /api/events
// @access  Private
const getMyEvents = async (req, res) => {
  const events = await Event.find({ organizerId: req.user._id });
  res.json(events);
};

// @desc    Get single event (Public)
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
};

module.exports = { createEvent, getMyEvents, getEventById };