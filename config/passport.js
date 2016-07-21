module.exports.passport = {
  local: {
    strategy: require('passport-local').Strategy
  },
  facebook:{
    name: 'Facebook',
    protocol: 'oauth2',
    strategy: require('passport-facebook').Strategy,
    options:{
      clientID: 'null',
      clientSecret: 'null',
      profileFields: [ 'id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'displayName' ],
      scope: ['email'],
      callbackURL: "http://localhost:1337/rest/auth/facebook/callback"
    }
  }
};
