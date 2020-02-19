/* eslint-disable no-multiple-empty-lines */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const Coaches = require('../coaches/coaches-model');
const url = require('url');
require('../config/passport-setup');
const {jwtSecret,hashRounds} = require('../consts');

module.exports = router;
router.use(passport.initialize());
const {
  validBodyCheck,
  validTokenCheck,
} = require('../middleware/custom_middleware');

// ********************************************************
// POST /auth/register
// this has nested thens
// ********************************************************
// router.post('/register',
//   validBodyCheck(['first_name','last_name', 'email','password']),
//   (req,res)=>{
//     let coachesInfo = req.body;

//     Coaches
//       .findCoachBy(coachesInfo.email)
//       .then(coach => {

//         if (coach && coach.password === null){
//           res.status(400).json({message: 'Google social login was done previously, can not register local login'});
//         } else if(coach && coach.password !== null){
//           res.status(400).json({message: 'local login was done previously'});

//         }else{
//           // hash the password
//           // hashRounds is the number of rounds (2^14) - iterations
//           const hash = bcrypt.hashSync(coachesInfo.password, hashRounds);

//           // override the plain text password with the hash
//           coachesInfo.password = hash;

//           Coaches.addCoach(coachesInfo)
//             .then(saved => {
//               const token = signToken(saved, 'coach');

//               res.status(201).json({ token, message: 'Logged In', first_name: saved.first_name, last_name: saved.last_name });
//             })
//             .catch(error => {
//               res.status(500).json(error);
//             });
//         }
//       });
//   }
// );

// ********************************************************
// POST /auth/register
// fixed nested thens with nested catches
// ********************************************************
router.post('/register',
  validBodyCheck(['first_name','last_name', 'email','password']),
  (req,res)=>{
    let coachesInfo = req.body;

    Coaches
      .findCoachBy(coachesInfo.email)
      .then(coach => {

        if (coach && coach.password === null){
          res.status(400).json({message: 'Google social login was done previously, can not register local login'});
        } else if(coach && coach.password !== null){
          res.status(400).json({message: 'local login was done previously'});

        }else{
          // hash the password
          // hashRounds is the number of rounds (2^14) - iterations
          const hash = bcrypt.hashSync(coachesInfo.password, hashRounds);

          // override the plain text password with the hash
          coachesInfo.password = hash;

          Coaches.addCoach(coachesInfo)
            .then(saved => {
              const token = signToken(saved, 'coach');

              res.status(201).json({ token, message: 'Logged In', first_name: saved.first_name, last_name: saved.last_name });
            })
            .catch(error => {
              res.status(500).json(error);
            });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
);

// ********************************************************
// POST /auth/login
// ********************************************************
router.post('/login',
  validBodyCheck(['email','password']),
  (req,res)=>{
    let {email, password} =req.body;

    Coaches.findCoachBy(email)

      .then(user=>{

        if (user && user.password !== null && bcrypt.compareSync(password, user.password)) {

          //Create a token
          const token = signToken(user,'coach');

          res.status(200).json({ token, message: 'Logged In', first_name: user.first_name, last_name: user.last_name });
        } else if (user && user.password === null ){
          res.status(400).json({message: 'Google social login was done previously, can not local login'});

        } else {
          res.status(401).json({ message: 'Failed to login. Incorrect email or password' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
);

// ********************************************************
//  auth with google
// ********************************************************

router.get('/google', passport.authenticate('google', {
  scope:['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', { session: false, scope:['profile', 'email']}), (req,res) => {

  const token = signToken(req.user,'coach');
  res.redirect(url.format({
    pathname: process.env.FRONTEND_DOMAIN,
    query: {
      token,
      first_name: req.user.first_name,
      last_name: req.user.last_name
    }
  }));

});

// ********************************************************
// signToken
// ********************************************************
function signToken(user, role) {
  const payload = {
    coachID: user.id,
    role: role
  };

  const secret = jwtSecret;

  const options = {
    expiresIn: '24h',
  };

  return jwt.sign(payload, secret, options);
}

// ********************************************************
// GET /auth/logincheck
// ********************************************************
router.get('/logincheck',
  validTokenCheck,
  (req,res)=> {
    res.status(200).send('You are on a restricted page');
  }
);