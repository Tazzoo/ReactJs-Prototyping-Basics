if (process.env.NODE !== 'production') {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_PASSWORD } = require('./keys');
  
  module.exports = {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_PASSWORD
  };
}
