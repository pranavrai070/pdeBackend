const Appointment = require('../models/Appointment');

const createAppointment = async (patientId, doctorId) => {
  try {
    const appointment = new Appointment({ patient: patientId, doctor: doctorId });
    await appointment.save();
    return { success: true, message: 'Appointment created successfully', appointment };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = createAppointment;
