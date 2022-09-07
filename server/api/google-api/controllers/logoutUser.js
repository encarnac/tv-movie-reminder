const https = require('https');
const { google } = require('googleapis');
const User = require('../models/User');


const logoutUser = async (req, res, next) => {
    try {
        const { googleId } = req.authUser;
        const deleteUser = await User.deleteMany( { googleId: googleId });
        req.session.destroy();

        // Build the string for the POST request
        const accessToken = req.oauth2Client.credentials.access_token;
        let postData = 'token=' + accessToken;
        console.log(postData);

        // Options for POST request to Google's OAuth 2.0 server to revoke a token
        const postOptions = {
        host: 'oauth2.googleapis.com',
        port: '443',
        path: '/revoke',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
        };
        console.log(postOptions);

        // // Set up the request
        const postReq = https.request(postOptions, function (res) {
        res.setEncoding('utf8');
        res.on('data', d => {
            console.log('Response: ' + d);
        });
        });

        postReq.on('error', error => {
        console.log(error)
        next(error)
        });

        // // Post the request with data
        postReq.write(postData);
        postReq.end();

        res.sendStatus(200)
        
    } catch(error) {
        next(error);
    }
};

module.exports = logoutUser;