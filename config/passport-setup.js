/* eslint-disable no-undef */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const Coaches = require('../coaches/coaches-model');

function googleStrt(accessToken, refreshToken, users, done) {
  // //check if user already exists in our own db

  Coaches
    .findCoachBy(users._json.email)
    .then((currentUser) => {
      if(currentUser){
      // already have this user
        done(null, currentUser);
      } else {
      // if not, create user in our db
        const coach = {
          first_name: users.name.givenName,
          last_name: users.name.familyName,
          email: users._json.email
        };
        Coaches.addCoach(coach)
          .then((newUser) => {
            done(null, newUser);
          });
      }
    });
}

passport.use(
  new GoogleStrategy( {
    clientID: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:'/auth/google/callback'
  }, (aT, rT, usr, dn) => {googleStrt(aT, rT, usr, dn);}  )
);

module.exports = googleStrt;