const User = require('../models/User'); // Assuming User model is defined
const { Expo } = require('expo-server-sdk'); // Import Expo SDK for push notifications

// Create a new Expo SDK client
const expo = new Expo();

exports.sendAlert = async (userId, location) => {
  try {
    const user = await User.findById(userId);
    const nearbyDoctors = await User.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: location
          },
          $maxDistance: 5000
        }
      },
      role: 'doctor'
    });

    // Prepare notifications for nearby doctors
    const notifications = nearbyDoctors.map(doctor => ({
      to: doctor.pushToken, // Replace with doctor's push token field
      sound: 'default',
      title: 'Emergency Alert',
      body: `Emergency alert from ${user.name}.`,
      data: { patientId: userId }
    }));

    // Send notifications using Expo's push notification service
    let chunks = expo.chunkPushNotifications(notifications);
    let tickets = [];
    for (let chunk of chunks) {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    }

    // Example logging of sent notifications
    for (const ticket of tickets) {
      if (ticket.status === 'ok') {
        console.log(`Notification sent successfully to ${ticket.to}`);
      } else {
        console.error(`Error sending notification to ${ticket.to}: ${ticket.details.error}`);
      }
    }

    return { success: true, message: 'Alert sent successfully' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
