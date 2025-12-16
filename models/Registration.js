const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', 
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'], 
    default: 'Pending'
  },
  ticketId: {
    type: String,
    unique: true, 
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Registration', RegistrationSchema);