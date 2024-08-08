const Alert = require('../models/Alert');
const User = require('../models/User');
const socketHandler = require('../sockets/socketHandler');

const sendAlert = async (req, res) => {
  try {
    const { userId, location } = req.body;
    console.log("getting userid and location",userId,location);
    const alert = new Alert({ patient: userId, location: { type: 'Point', coordinates: location } });
    await alert.save();

    // Emit socket event for new alert
    socketHandler.emitNewAlert(alert);

    res.status(200).json({ success: true, message: 'Alert sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const acceptAlert = async (req, res) => {
  try {
    console.log("getting data to accept alert",req.body);
    const { alertId,userId } = req.body;
    const location=[28.6405155, 77.2827173];

    const alert = await Alert.findById(alertId).populate('patient');
    if (!alert) {
      return res.status(404).json({ success: false, message: 'Alert not found' });
    }

    if (alert.status === 'accepted') {
      return res.status(400).json({ success: false, message: 'Alert already accepted' });
    }

    alert.doctorLocation ={ type: 'Point', coordinates: location };
    alert.status = 'accepted';
    alert.doctor = userId;
    await alert.save();

    // Emit socket event for alert acceptance
    socketHandler.emitAlertAccepted(alert);

    res.status(200).json({ success: true, message: 'Alert accepted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const closeAlert = async (req, res) => {
  try {
    console.log("getting data to close alert",req.body);
    const { alertId} = req.body;

    const alert = await Alert.findById(alertId).populate('patient');
    if (!alert) {
      return res.status(404).json({ success: false, message: 'Alert not found' });
    }

    if (alert.status === 'done') {
      return res.status(400).json({ success: false, message: 'Alert already Done' });
    }

    alert.status = 'done';
    await alert.save();

    res.status(200).json({ success: true, message: 'Alert Done successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAlerts=async(req,res)=>{
  console.log("get his");
  const {type}=req.body;
  const alerts = await Alert.find({status:type});
  return res.status(200).json({alerts:alerts});
};

const getAlert =async(req,res)=>{
  const alertId=req.params.alertId;
  const alert = await Alert.findById(alertId);
  return res.status(200).json({alert:alert});
};


const getPatientPendingAlert = async (req, res) => {
  console.log("patent id gets hit",req.body);
  const { patientId } = req.body;

  try {
    const alert = await Alert.find({ patient: patientId });
    console.log("getting alert",alert);
    res.status(200).json({ alert });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient alerts', error });
  }
};


module.exports={
    acceptAlert,
    sendAlert,
    getAlerts,
    getAlert,
    getPatientPendingAlert,
    closeAlert
}
