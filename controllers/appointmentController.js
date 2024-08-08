const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId } = req.body;
    const appointment = new Appointment({ patient: patientId, doctor: doctorId });
    await appointment.save();
    res.status(200).json({ success: true, message: 'Appointment created successfully', appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {createAppointment};
