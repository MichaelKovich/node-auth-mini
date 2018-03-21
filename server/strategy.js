const Auth0Strategy = require('passport-auth0');

const {DOMAIN, CLIENT_ID, CLIENT_SECRET} = process.env;

module.exports = new Auth0Strategy(
  {
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    // scope: 'openid profile'
    callbackURL: '/auth',
  },
  (accessToken, refreshToken, extraParams, profile, done) =>
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    done(null, profile),
);
