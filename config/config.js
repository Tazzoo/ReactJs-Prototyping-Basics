const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_PASSWORD } = require('./keys');

if (SPOTIFY_CLIENT_ID !== null && SPOTIFY_CLIENT_PASSWORD !== null) {
  module.exports = {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_PASSWORD
  };
}
