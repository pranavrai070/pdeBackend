const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: { type: String }, coordinates: [Number] },
  doctorLocation:{ type: { type: String }, coordinates: [Number] },
  status: { type: String, enum: ['pending', 'accepted','done'], default: 'pending' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // Add more fields as needed
}, { timestamps: true });

alertSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Alert', alertSchema);
