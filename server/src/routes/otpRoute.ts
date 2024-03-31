import express from "express";
import twilio from 'twilio';
import AppDataSource from "../dataSource";
import dotenv from 'dotenv';

dotenv.config();

const otpRouter = express.Router();
const appDataSource = AppDataSource; // Assuming this is used elsewhere in your code

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

otpRouter.post('/send-otp', (req, res) => {
  const phoneNumber = req.body.phoneNumber; // Get the phone number from the request body
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

  twilioClient.messages.create({
    body: `Your OTP is: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER, // Use your Twilio phone number from environment variables
    to: phoneNumber,
  })
  .then(message => {
    console.log(message.sid);
    res.send({ success: true, message: 'OTP sent successfully' });
  })
  .catch(error => {
    console.error(error);
    res.status(500).send({ success: false, message: 'Failed to send OTP' });
  });
});

export default otpRouter;


