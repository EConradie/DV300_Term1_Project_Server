import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import Twilio from 'twilio';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID as string; // Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN as string; // Twilio Auth Token
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID as string; // Twilio Verify Service SID

const client = Twilio(accountSid, authToken);

export const sendOtp = async (req: Request, res: Response) => {
    const { to } = req.body;
    try {
        const verification = await client.verify.v2.services(verifyServiceSid)
            .verifications
            .create({to, channel: 'sms'});
        res.status(200).send({ message: 'OTP sent successfully', status: verification.status });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).send({ message: 'Error sending OTP', error: (error as { message: string }).message });
    }
};

export const verifyOtp = async (req: Request, res: Response) => {
    const { to, code } = req.body;
    try {
        const verificationCheck = await client.verify.v2.services(verifyServiceSid)
            .verificationChecks
            .create({to, code});
        if (verificationCheck.status === 'approved') {
            res.status(200).send({ message: 'OTP verified successfully' });
        } else {
            res.status(400).send({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).send({ message: 'Error verifying OTP', error: (error as { message: string }).message });
    }
};
