let express = require('express');
let axios = require('axios');
let querystring = require('querystring');
let config = require('./config/config');
let app = express();

let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:8888/callback';

app.get('/login', function(req, res) {
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: config.SPOTIFY_CLIENT_ID,
        scope: 'playlist-read-private',
        offset: 0,
        redirect_uri
      })
  );
});

app.get('/callback', function(req, res) {
  let code = req.query.code || null;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      Authorization: 'Basic ' + new Buffer.from(config.SPOTIFY_CLIENT_ID + ':' + config.SPOTIFY_CLIENT_PASSWORD).toString('base64')
    },
    json: true
  };
  axios.post(authOptions, function(error, response, body) {
    var access_token = body.access_token;
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000';
    res.redirect(uri + '?access_token=' + access_token);
  });
});

let port = process.env.PORT || 8888;
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`);
app.listen(port);
