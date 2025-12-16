const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  ticketLimit: {
    type: Number,
    required: true
  },
  approvalMode: {
    type: String,
    enum: ['Auto', 'Manual'], 
    default: 'Auto',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);