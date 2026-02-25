const express = require('express');
const twilio = require('twilio');

const router = express.Router();

// Twilio credentials
const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const client = twilio(accountSid, authToken);

// Verify OTP Route
router.post('/verify', async (req, res) => {
    const { phone, otp } = req.body;

    // Logic to retrieve the OTP stored in your database for the phone number
    const storedOtp = '123456'; // Replace this with your own logic to get the stored OTP

    if (otp === storedOtp) {
        return res.status(200).json({ message: 'OTP verified successfully!' });
    } else {
        return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }
});

// Send OTP Route
router.post('/send-otp', async (req, res) => {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP

    // Store the OTP in your database against the user's phone number
    // example: await storeOtpInDatabase(phone, otp);

    try {
        await client.messages.create({
            body: `Your OTP is ${otp}`,
            from: 'your_twilio_phone_number',
            to: phone
        });
        return res.status(200).json({ message: 'OTP sent successfully!' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to send OTP.', error });
    }
});

module.exports = router;