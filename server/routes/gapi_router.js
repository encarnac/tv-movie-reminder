const express = require('express');
const router = express.Router();
const { google } = require('googleapis');

const CLIENT_ID = '439274580520-psn6jfl8i303hv6f86nuul7kk9c3ddhc.apps.googleusercontent.com'
const CLIENT_SECRET = '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'

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'http://localhost:3000'
);

// Handle request for the communication pipeline with the TMDB scraper
router.post('/login', async(req, res, next) => {
    try {
        const { code } = req.body;
        const token = await oauth2Client.getToken(code)
        res.cookie('token', token.refresh_token, { httpOnly: true });
        res.send(token)
    } catch (error) {
        next(error);
    };
})

module.exports = router;
