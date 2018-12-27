const express = require('express');
const request = require('request');
const path = require('path');
const querystring = require('querystring');
const config = require('./config/config');
const app = express();

const PORT = process.env.PORT || 5000;
const client_id = process.env.SPOTIFY_CLIENT_ID || config.SPOTIFY_CLIENT_ID;
const client_password = process.env.SPOTIFY_CLIENT_PASSWORD || config.SPOTIFY_CLIENT_PASSWORD;
const redirect_uri = process.env.REDIRECT_URI || `http://localhost:${PORT}/callback`;

app.get('/login', function(req, res) {
    res.redirect(
        'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: 'playlist-read-private',
                offset: 0,
                redirect_uri
            })
    );
});

app.get('/callback', function(req, res) {
    const code = req.query.code || null;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code,
            redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            Authorization: 'Basic ' + Buffer.from(client_id + ':' + client_password).toString('base64')
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        const { access_token } = body;
        const uri = process.env.FRONTEND_URI || `http://localhost:${PORT}`;

        res.redirect(uri + '?access_token=' + access_token);
    });
});

if (process.env.NODE_ENV === 'production') {
    // Serve the static files from the React app
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handles any requests that don't match the ones above
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}

app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}. Go /login to initiate authentication flow.`);
});
