const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const Coaches = require('../coaches/coaches-model');


passport.use( 
  new GoogleStrategy( {
    clientID: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:'/auth/google/callback'
  }, (accessToken, refreshToken, users, done) => {
    // console.log(users);
    // //check if user already exists in our own db
    Coaches
      .findCoachBy(users.emails[0].value)
      .then((currentUser) => {
        if(currentUser){
          // already have this user
          // console.log('user is: ', currentUser);
          done(null, currentUser);
        } else {
          // if not, create user in our db
          const coach = { 
            first_name: users.name.givenName, 
            last_name: users.name.familyName,  
            email: users.emails[0].value    
          };
          Coaches.addCoach(coach)
            .then((newUser) => {
              console.log('created new user: ', newUser);
              done(null, newUser);
            });
        }
      });
  })
);